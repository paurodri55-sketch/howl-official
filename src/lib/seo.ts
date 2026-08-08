import { locales, type Locale } from "@/lib/i18n/config";

export const SITE_URL = "https://howlofficial.com";

export const OG_LOCALE: Record<Locale, string> = {
  es: "es_ES",
  en: "en_US",
};

/** Bloque `alternates` (canonical + hreflang) para una ruta sin prefijo de idioma, ej. "/catalogo". */
export function buildAlternates(path: string, locale: Locale) {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: Object.fromEntries(
      locales.map((l) => [l, `${SITE_URL}/${l}${path}`])
    ),
  };
}
