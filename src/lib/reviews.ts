/**
 * Reseñas de producto con compra verificada. Sin sistema de cuentas: el
 * enlace para reseñar es un token firmado (HMAC) que codifica email+slug,
 * mandado por email tras una compra real confirmada por el webhook de
 * Stripe (ver orders-store.ts). El rating/reviewCount de un producto se
 * calcula siempre a partir de las reseñas publicadas reales — nunca es un
 * número fijo guardado a mano (por eso se quitaron de products.ts).
 */
import { createHmac, timingSafeEqual, randomUUID } from "node:crypto";
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

const REVIEW_TOKEN_SECRET = process.env.REVIEW_TOKEN_SECRET;

export interface Review {
  id: string;
  slug: string;
  rating: number;
  text: string;
  authorLabel: string;
  date: string;
  verifiedPurchase: true;
  published: boolean;
}

interface ReviewTokenPayload {
  email: string;
  slug: string;
}

function base64url(input: string): string {
  return Buffer.from(input, "utf8").toString("base64url");
}

function sign(payloadB64: string): string {
  if (!REVIEW_TOKEN_SECRET) {
    throw new Error("REVIEW_TOKEN_SECRET no configurado");
  }
  return createHmac("sha256", REVIEW_TOKEN_SECRET).update(payloadB64).digest("hex");
}

/** Genera el enlace de invitación a reseñar (email+slug firmados, sin exponer más datos). */
export function createReviewToken(email: string, slug: string): string {
  const payloadB64 = base64url(JSON.stringify({ email: email.trim().toLowerCase(), slug }));
  return `${payloadB64}.${sign(payloadB64)}`;
}

/** Valida el token y devuelve email+slug si la firma es correcta. */
export function verifyReviewToken(token: string): ReviewTokenPayload | null {
  if (!REVIEW_TOKEN_SECRET) return null;
  const [payloadB64, providedSig] = token.split(".");
  if (!payloadB64 || !providedSig) return null;

  const expectedSig = sign(payloadB64);
  const a = Buffer.from(providedSig, "hex");
  const b = Buffer.from(expectedSig, "hex");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));
    if (typeof payload.email !== "string" || typeof payload.slug !== "string") return null;
    return payload;
  } catch {
    return null;
  }
}

function reviewedMarkerKey(email: string, slug: string): string {
  return `reviewed:${email.trim().toLowerCase()}:${slug}`;
}

export async function hasAlreadyReviewed(email: string, slug: string): Promise<boolean> {
  if (!redis) return false;
  return Boolean(await redis.get(reviewedMarkerKey(email, slug)));
}

export interface SubmitReviewInput {
  email: string;
  slug: string;
  rating: number;
  text: string;
  authorLabel: string;
}

export async function submitReview(input: SubmitReviewInput): Promise<Review> {
  if (!redis) throw new Error("Almacén de reseñas no configurado");

  const review: Review = {
    id: randomUUID(),
    slug: input.slug,
    rating: input.rating,
    text: input.text,
    authorLabel: input.authorLabel,
    date: new Date().toISOString(),
    verifiedPurchase: true,
    published: false,
  };

  await redis.set(`review:${review.id}`, JSON.stringify(review));
  await redis.lpush(`reviews:by-slug:${input.slug}`, review.id);
  await redis.lpush("reviews:pending", review.id);
  await redis.set(reviewedMarkerKey(input.email, input.slug), "1");

  return review;
}

async function getReview(id: string): Promise<Review | null> {
  if (!redis) return null;
  const raw = await redis.get<string | Review>(`review:${id}`);
  if (!raw) return null;
  return typeof raw === "string" ? JSON.parse(raw) : raw;
}

/** Solo reseñas ya aprobadas por moderación — lo que se muestra en la web pública. */
export async function getPublishedReviews(slug: string): Promise<Review[]> {
  if (!redis) return [];
  const ids = await redis.lrange(`reviews:by-slug:${slug}`, 0, -1);
  const reviews = await Promise.all(ids.map((id) => getReview(id)));
  return reviews.filter((r): r is Review => r !== null && r.published);
}

/** Rating/reviewCount reales, calculados sobre la marcha — nunca hardcodeados. */
export async function getRatingSummary(
  slug: string
): Promise<{ rating: number; reviewCount: number } | null> {
  const reviews = await getPublishedReviews(slug);
  if (reviews.length === 0) return null;
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return { rating: Math.round(avg * 10) / 10, reviewCount: reviews.length };
}

/** Cola de moderación (panel de admin) — pendientes de aprobar/rechazar. */
export async function getPendingReviews(): Promise<Review[]> {
  if (!redis) return [];
  const ids = await redis.lrange("reviews:pending", 0, -1);
  const reviews = await Promise.all(ids.map((id) => getReview(id)));
  return reviews.filter((r): r is Review => r !== null && !r.published);
}

export async function moderateReview(id: string, approve: boolean): Promise<void> {
  if (!redis) return;
  const review = await getReview(id);
  if (approve) {
    if (review) {
      review.published = true;
      await redis.set(`review:${id}`, JSON.stringify(review));
    }
  } else {
    await redis.del(`review:${id}`);
    if (review) {
      await redis.lrem(`reviews:by-slug:${review.slug}`, 0, id);
    }
  }
  await redis.lrem("reviews:pending", 0, id);
}
