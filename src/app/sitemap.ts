import type { MetadataRoute } from "next";
import { getVisibleProducts } from "@/lib/products";
import { locales, type Locale } from "@/lib/i18n/config";

const SITE_URL = "https://howlofficial.com";

function languageAlternates(path: string) {
  return Object.fromEntries(
    locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`])
  );
}

function localizedEntries(
  path: string,
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>,
  priority: number
): MetadataRoute.Sitemap {
  return locales.map((locale: Locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    changeFrequency,
    priority,
    alternates: { languages: languageAlternates(path) },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const productRoutes = getVisibleProducts().flatMap((product) =>
    localizedEntries(`/producto/${product.slug}`, "weekly", 0.8)
  );

  return [
    ...localizedEntries("", "daily", 1),
    ...localizedEntries("/catalogo", "daily", 0.9),
    ...localizedEntries("/sobre-nosotros", "monthly", 0.5),
    ...productRoutes,
  ];
}
