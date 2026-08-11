/**
 * Registro real y duradero de pedidos confirmados (Vercel KV / Upstash Redis).
 * Lo llena el webhook de Stripe cuando un pago se completa de verdad — es la
 * única fuente de verdad para saber si un email compró un producto concreto,
 * necesaria para verificar reseñas de "compra verificada" sin sistema de
 * cuentas de usuario.
 */
import { Redis } from "@upstash/redis";

const isKvConfigured = Boolean(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
);

const redis = isKvConfigured
  ? new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
  : null;

export interface OrderItem {
  slug: string;
  size: string;
  quantity: number;
}

export interface Order {
  sessionId: string;
  email: string;
  items: OrderItem[];
  date: string;
}

function purchasesKey(email: string): string {
  return `purchases:${email.trim().toLowerCase()}`;
}

/**
 * Idempotente: usa el sessionId de Stripe como clave, así que reenvíos del
 * mismo evento de webhook (Stripe reintenta si no respondemos 200 a tiempo)
 * no duplican el pedido.
 */
export async function saveOrder(order: Order): Promise<void> {
  if (!redis) return;

  const key = `order:${order.sessionId}`;
  const alreadySaved = await redis.get(key);
  if (alreadySaved) return;

  await redis.set(key, JSON.stringify(order));

  const email = order.email.trim().toLowerCase();
  for (const item of order.items) {
    await redis.sadd(purchasesKey(email), item.slug);
  }
}

/** ¿Este email tiene un pedido real que incluya este producto? */
export async function hasVerifiedPurchase(
  email: string,
  slug: string
): Promise<boolean> {
  if (!redis) return false;
  return Boolean(await redis.sismember(purchasesKey(email), slug));
}

export async function getOrder(sessionId: string): Promise<Order | null> {
  if (!redis) return null;
  const raw = await redis.get<string | Order>(`order:${sessionId}`);
  if (!raw) return null;
  return typeof raw === "string" ? JSON.parse(raw) : raw;
}
