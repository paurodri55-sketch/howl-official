/**
 * Almacén real y duradero de altas al newsletter (Vercel KV / Upstash Redis).
 * Independiente del ESP (Mailchimp, ver lib/mailchimp.ts) — esto es la fuente
 * de verdad de qué emails se han apuntado, exista o no Mailchimp conectado.
 */
import { Redis } from "@upstash/redis";

const SET_KEY = "newsletter:emails";
const LIST_KEY = "newsletter:signups";

const isKvConfigured = Boolean(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
);

const redis = isKvConfigured
  ? new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
  : null;

export interface SaveSignupResult {
  configured: boolean;
  isNew: boolean;
}

export async function saveSignup(
  email: string,
  source: string
): Promise<SaveSignupResult> {
  if (!redis) {
    return { configured: false, isNew: true };
  }

  const normalized = email.trim().toLowerCase();
  const added = await redis.sadd(SET_KEY, normalized);
  const isNew = added === 1;

  if (isNew) {
    await redis.lpush(
      LIST_KEY,
      JSON.stringify({ email: normalized, source, date: new Date().toISOString() })
    );
  }

  return { configured: true, isNew };
}

export async function countSignups(): Promise<number> {
  if (!redis) return 0;
  return redis.scard(SET_KEY);
}
