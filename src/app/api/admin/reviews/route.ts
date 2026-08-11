import { NextResponse } from "next/server";
import { getPendingReviews, moderateReview } from "@/lib/reviews";

function isAuthorized(request: Request): boolean {
  const key = new URL(request.url).searchParams.get("key");
  return Boolean(process.env.ADMIN_SECRET) && key === process.env.ADMIN_SECRET;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const pending = await getPendingReviews();
  return NextResponse.json({ pending });
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = (await request.json()) as { id?: string; approve?: boolean };
  if (!body.id || typeof body.approve !== "boolean") {
    return NextResponse.json({ error: "Faltan id/approve" }, { status: 400 });
  }
  await moderateReview(body.id, body.approve);
  return NextResponse.json({ success: true });
}
