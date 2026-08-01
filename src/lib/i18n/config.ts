export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Antepone el idioma actual a una ruta interna (ej. "/catalogo" -> "/es/catalogo"). */
export function withLocale(path: string, locale: Locale): string {
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}
