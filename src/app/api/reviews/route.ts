import { NextResponse } from "next/server";
import {
  verifyReviewToken,
  hasAlreadyReviewed,
  submitReview,
} from "@/lib/reviews";
import { hasVerifiedPurchase } from "@/lib/orders-store";
import { checkRateLimit } from "@/lib/newsletter-store";

const MAX_TEXT_LENGTH = 1000;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { allowed } = await checkRateLimit(ip, 10, 3600, "reviews");
  if (!allowed) {
    return NextResponse.json({ error: "Demasiados intentos, prueba más tarde" }, { status: 429 });
  }

  const body = (await request.json()) as {
    token?: string;
    rating?: number;
    text?: string;
    authorLabel?: string;
  };

  if (!body.token) {
    return NextResponse.json({ error: "Falta el token" }, { status: 400 });
  }

  // El email/slug nunca se leen del cliente directamente: solo del token
  // firmado, así nadie puede reseñar un producto que no compró.
  const payload = verifyReviewToken(body.token);
  if (!payload) {
    return NextResponse.json({ error: "Enlace de reseña inválido o caducado" }, { status: 403 });
  }

  const verified = await hasVerifiedPurchase(payload.email, payload.slug);
  if (!verified) {
    return NextResponse.json({ error: "No encontramos una compra verificada para este producto" }, { status: 403 });
  }

  if (await hasAlreadyReviewed(payload.email, payload.slug)) {
    return NextResponse.json({ error: "Ya has dejado una reseña para este producto" }, { status: 409 });
  }

  const rating = body.rating;
  if (!Number.isInteger(rating) || rating! < 1 || rating! > 5) {
    return NextResponse.json({ error: "La valoración debe ser un número entero de 1 a 5" }, { status: 400 });
  }

  const text = (body.text ?? "").trim();
  if (text.length === 0 || text.length > MAX_TEXT_LENGTH) {
    return NextResponse.json(
      { error: `El texto debe tener entre 1 y ${MAX_TEXT_LENGTH} caracteres` },
      { status: 400 }
    );
  }

  const authorLabel = (body.authorLabel ?? "").trim().slice(0, 60) || "Cliente verificado";

  const review = await submitReview({
    email: payload.email,
    slug: payload.slug,
    rating: rating!,
    text,
    authorLabel,
  });

  return NextResponse.json({ success: true, reviewId: review.id });
}
