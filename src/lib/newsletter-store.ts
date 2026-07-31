/**
 * Almacén real y duradero de altas al newsletter (Vercel KV / Upstash Redis).
 * Independiente del ESP (Mailchimp, ver lib/mailchimp.ts) — esto es la fuente
 * de verdad de qué emails se han apuntado, exista o no Mailchimp conectado.
 */
import { kv } from "@vercel/kv";

const SET_KEY = "newsletter:emails";
const LIST_KEY = "newsletter:signups";

const isKvConfigured = Boolean(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
);

export interface SaveSignupResult {
  configured: boolean;
  isNew: boolean;
}

export async function saveSignup(
  email: string,
  source: string
): Promise<SaveSignupResult> {
  if (!isKvConfigured) {
    return { configured: false, isNew: true };
  }

  const normalized = email.trim().toLowerCase();
  const added = await kv.sadd(SET_KEY, normalized);
  const isNew = added === 1;

  if (isNew) {
    await kv.lpush(
      LIST_KEY,
      JSON.stringify({ email: normalized, source, date: new Date().toISOString() })
    );
  }

  return { configured: true, isNew };
}

export async function countSignups(): Promise<number> {
  if (!isKvConfigured) return 0;
  return kv.scard(SET_KEY);
}
