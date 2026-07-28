/**
 * Punto de integración con Printful (producción y envío bajo demanda),
 * pendiente de conectar.
 *
 * Cómo activarlo más adelante:
 *  1. Crea una API key en https://developers.printful.com/
 *  2. Añade PRINTFUL_API_KEY y PRINTFUL_STORE_ID a .env.local (ver .env.example)
 *  3. Sustituye getPrintfulVariants por una llamada real, p. ej.:
 *
 *     export async function getPrintfulVariants(printfulProductId: number) {
 *       const res = await fetch(
 *         `https://api.printful.com/store/products/${printfulProductId}`,
 *         { headers: { Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}` } }
 *       );
 *       if (!res.ok) throw new Error("Error consultando Printful");
 *       return res.json();
 *     }
 *
 *  4. En createPrintfulOrder, mapea cada CartItem a un `variant_id` real de
 *     Printful (talla + color) y llama a POST /orders tras confirmarse el
 *     pago en el webhook de Stripe.
 *
 * Hasta entonces, cada Product de lib/products.ts usa datos ficticios de
 * talla/color en vez de variant IDs de Printful.
 */

import type { CartItem } from "@/lib/types";

const isPrintfulConfigured = Boolean(process.env.PRINTFUL_API_KEY);

export interface PrintfulOrderResult {
  configured: boolean;
  orderId: string | null;
}

export async function createPrintfulOrder(
  items: CartItem[]
): Promise<PrintfulOrderResult> {
  if (!isPrintfulConfigured) {
    return { configured: false, orderId: null };
  }

  throw new Error(
    "PRINTFUL_API_KEY está definido pero la integración real de Printful " +
      "todavía no está implementada. Completa createPrintfulOrder en lib/printful.ts."
  );
}
