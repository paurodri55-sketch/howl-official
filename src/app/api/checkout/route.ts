import { NextResponse } from "next/server";
import type { CartItem } from "@/lib/types";
import { createCheckoutSession } from "@/lib/stripe";

/**
 * Seam de checkout. Hoy simula un pedido (no hay pasarela de pago real).
 * Cuando se conecte Stripe (ver lib/stripe.ts):
 *   1. Este handler llamará a createCheckoutSession(...) con los items reales.
 *   2. Si `session.url` viene definido, el cliente redirige ahí en vez de
 *      mostrar la confirmación simulada.
 *   3. Un webhook en /api/webhooks/stripe confirmará el pago y disparará
 *      createPrintfulOrder(...) desde lib/printful.ts.
 */
export async function POST(request: Request) {
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
