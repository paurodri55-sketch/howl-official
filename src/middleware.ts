import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, isLocale } from "@/lib/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  const cookieLocale = request.cookies.get("locale")?.value;
  const locale =
    cookieLocale && isLocale(cookieLocale)
      ? cookieLocale
      : preferredLocaleFromHeader(request.headers.get("accept-language")) ?? defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

/** Elige el primer idioma soportado que el navegador acepte, por orden de preferencia (header Accept-Language). */
function preferredLocaleFromHeader(header: string | null) {
  if (!header) return null;
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase());
  return preferred.find((lang) => isLocale(lang)) ?? null;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
