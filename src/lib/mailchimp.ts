/**
 * Punto de integración con Mailchimp (pendiente de conectar).
 *
 * Cómo activarlo:
 *  1. Crea la cuenta en mailchimp.com y una Audience (lista).
 *  2. Añade MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX (ej. "us21", es el
 *     sufijo de la URL que ves al iniciar sesión) y MAILCHIMP_AUDIENCE_ID
 *     a .env.local (ver .env.example).
 *  3. En cuanto las tres variables existen, subscribeToNewsletter() empieza
 *     a dar de alta altas reales en la Audience automáticamente — no hace
 *     falta tocar código.
 *
 * Mientras no esté configurado, el alta se acepta (modo mock) para que el
 * formulario funcione en desarrollo, pero no se persiste en ningún sitio.
 */

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

const isMailchimpConfigured = Boolean(
  MAILCHIMP_API_KEY && MAILCHIMP_SERVER_PREFIX && MAILCHIMP_AUDIENCE_ID
);

export interface NewsletterSubscribeResult {
  configured: boolean;
  ok: boolean;
}

export async function subscribeToNewsletter(
  email: string,
  source: string
): Promise<NewsletterSubscribeResult> {
  if (!isMailchimpConfigured) {
    return { configured: false, ok: true };
  }

  const res = await fetch(
    `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
    {
      method: "POST",
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
        tags: [source],
      }),
    }
  );

  // 400 con "Member Exists" es el caso normal de un email repetido: éxito.
  if (!res.ok && res.status !== 400) {
    return { configured: true, ok: false };
  }

  return { configured: true, ok: true };
}
