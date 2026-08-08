/**
 * Integración con Stripe Checkout. Usa STRIPE_SECRET_KEY — si es una clave de
 * prueba (sk_test_...) no se mueve dinero real, aunque el flujo sea idéntico.
 */
import Stripe from "stripe";
import type { CartItem } from "@/lib/types";
import { getProductBySlug } from "@/lib/products";

export interface CheckoutInput {
  items: CartItem[];
  customerEmail?: string;
}

export interface CheckoutResult {
  configured: boolean;
  sessionId: string;
  url: string | null;
}

const isStripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);
const stripe = isStripeConfigured
  ? new Stripe(process.env.STRIPE_SECRET_KEY!)
  : null;

export async function createCheckoutSession(
  input: CheckoutInput
): Promise<CheckoutResult> {
  if (!stripe) {
    return {
      configured: false,
      sessionId: `mock_${Date.now()}`,
      url: null,
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://howlofficial.com";

  // El precio se busca en el servidor a partir del slug — nunca nos fiamos
  // del precio que manda el cliente, para que no se pueda manipular el cobro.
  const lineItems = input.items.map((item) => {
    const product = getProductBySlug(item.slug);
    if (!product) throw new Error(`Producto no encontrado: ${item.slug}`);
    return {
      quantity: item.quantity,
      price_data: {
        currency: "eur",
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: `${product.name} — ${item.size} / ${item.color.name}`,
        },
      },
    };
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: input.customerEmail || undefined,
    line_items: lineItems,
    success_url: `${siteUrl}/checkout?success=1&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout?canceled=1`,
  });

  return {
    configured: true,
    sessionId: session.id,
    url: session.url,
  };
}
