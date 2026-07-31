import { NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/mailchimp";

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

  const result = await subscribeToNewsletter(body.email, body.source ?? "web");

  if (!result.ok) {
    return NextResponse.json(
      { success: false, error: "No se pudo completar el alta" },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, mode: result.configured ? "mailchimp" : "mock" });
}
