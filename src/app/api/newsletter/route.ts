import { NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/mailchimp";
import { saveSignup } from "@/lib/newsletter-store";

function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; source?: string };

  if (!isValidEmail(body.email)) {
    return NextResponse.json(
      { success: false, error: "Email no válido" },
      { status: 400 }
    );
  }

  const source = body.source ?? "web";
  const stored = await saveSignup(body.email, source);

  if (!stored.configured) {
    return NextResponse.json(
      { success: false, error: "El almacén de emails no está configurado todavía" },
      { status: 503 }
    );
  }

  // Mailchimp es opcional y aún no está configurado — la fuente de verdad es
  // Vercel KV. Si más adelante hay API key de Mailchimp, esto empieza a
  // sincronizar también ahí sin tocar nada más.
  const mailchimpResult = await subscribeToNewsletter(body.email, source);

  return NextResponse.json({
    success: true,
    mode: mailchimpResult.configured ? "mailchimp+kv" : "kv",
  });
}
