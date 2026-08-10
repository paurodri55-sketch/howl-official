import { NextResponse } from "next/server";
import type { CartItem } from "@/lib/types";
import { createCheckoutSession } from "@/lib/stripe";
import { isPreLaunch } from "@/lib/launch";

/**
 * Seam de checkout, conectado a Stripe real (ver lib/stripe.ts) cuando
 * STRIPE_SECRET_KEY está configurada.
 *   1. Este handler llama a createCheckoutSession(...) con los items reales.
 *   2. Si `session.url` viene definido, el cliente redirige ahí.
 *   3. Un webhook en /api/webhooks/stripe confirmará el pago y disparará
 *      la creación del pedido con el proveedor de producción.
 *
 * Bloqueado hasta LAUNCH_DATE (decisión de Pau, 2026-08-10: coming-soon
 * total, nada comprable de verdad antes del lanzamiento) — gate aquí en
 * vez de solo en la UI, porque es el único punto que no se puede saltar
 * manipulando el cliente.
 */
export async function POST(request: Request) {
  if (isPreLaunch()) {
    return NextResponse.json(
      { success: false, error: "Todavía no hemos abierto la venta", preLaunch: true },
      { status: 403 }
    );
  }

  const body = (await request.json()) as {
    items: CartItem[];
    customerEmail?: string;
  };

  if (!body.items || body.items.length === 0) {
    return NextResponse.json(
      { success: false, error: "El carrito está vacío" },
      { status: 400 }
    );
  }

  const session = await createCheckoutSession({
    items: body.items,
    customerEmail: body.customerEmail,
  });

  return NextResponse.json({
    success: true,
    mode: session.configured ? "stripe" : "mock",
    sessionId: session.sessionId,
    redirectUrl: session.url,
  });
}
