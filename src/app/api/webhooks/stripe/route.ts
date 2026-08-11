import { NextResponse } from "next/server";
import Stripe from "stripe";
import { saveOrder, type OrderItem } from "@/lib/orders-store";

/**
 * Confirma pagos reales de Stripe y guarda el pedido — es la única fuente de
 * verdad de qué se compró de verdad, usada luego para verificar reseñas de
 * "compra verificada" (ver src/lib/orders-store.ts).
 *
 * Configurar en el dashboard de Stripe (o `stripe listen` en local) apuntando
 * a esta URL, evento `checkout.session.completed`, y copiar el signing
 * secret a STRIPE_WEBHOOK_SECRET. Sin STRIPE_SECRET_KEY/STRIPE_WEBHOOK_SECRET
 * configuradas, esta ruta no hace nada (modo mock, igual que /api/checkout).
 */
const isStripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);
const stripe = isStripeConfigured
  ? new Stripe(process.env.STRIPE_SECRET_KEY!)
  : null;

export async function POST(request: Request) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ received: false, configured: false });
  }

  // Cuerpo en crudo, sin parsear — la firma de Stripe se calcula sobre los
  // bytes exactos que mandaron, no sobre un JSON re-serializado.
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Falta la cabecera stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Firma inválida";
    return NextResponse.json({ error: `Webhook inválido: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email ?? session.customer_details?.email;

    if (email) {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ["data.price.product"],
      });

      const items: OrderItem[] = lineItems.data
        .map((lineItem) => {
          const product = lineItem.price?.product;
          const metadata =
            product && typeof product === "object" && "metadata" in product
              ? (product.metadata as { slug?: string; size?: string })
              : undefined;
          if (!metadata?.slug) return null;
          return {
            slug: metadata.slug,
            size: metadata.size ?? "",
            quantity: lineItem.quantity ?? 1,
          };
        })
        .filter((item): item is OrderItem => item !== null);

      await saveOrder({
        sessionId: session.id,
        email,
        items,
        date: new Date().toISOString(),
      });
    }
  }

  return NextResponse.json({ received: true });
}
