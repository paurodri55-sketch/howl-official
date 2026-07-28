/**
 * Punto de integración con Stripe (pendiente de conectar).
 *
 * Cómo activarlo más adelante:
 *  1. npm install stripe
 *  2. Añade STRIPE_SECRET_KEY y STRIPE_WEBHOOK_SECRET a .env.local (ver .env.example)
 *  3. Sustituye el cuerpo de `createCheckoutSession` por algo como:
 *
 *     import Stripe from "stripe";
 *     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
 *
 *     export async function createCheckoutSession(input: CheckoutInput) {
 *       return stripe.checkout.sessions.create({
 *         mode: "payment",
 *         line_items: input.items.map((item) => ({
 *           quantity: item.quantity,
 *           price_data: {
 *             currency: "eur",
 *             unit_amount: Math.round(item.price * 100),
 *             product_data: { name: `${item.name} — ${item.size} / ${item.color.name}` },
 *           },
 *         })),
 *         success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?success=1`,
 *         cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?canceled=1`,
 *       });
 *     }
 *
 *  4. Desde el checkout, llama a /api/checkout y redirige a `session.url`.
 *  5. Crea /api/webhooks/stripe para escuchar `checkout.session.completed`
 *     y disparar el pedido en Printful (ver lib/printful.ts).
 */

import type { CartItem } from "@/lib/types";

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

export async function createCheckoutSession(
  input: CheckoutInput
): Promise<CheckoutResult> {
  if (!isStripeConfigured) {
    return {
      configured: false,
      sessionId: `mock_${Date.now()}`,
      url: null,
    };
  }

  throw new Error(
    "STRIPE_SECRET_KEY está definido pero la integración real de Stripe " +
      "todavía no está implementada. Completa createCheckoutSession en lib/stripe.ts."
  );
}
