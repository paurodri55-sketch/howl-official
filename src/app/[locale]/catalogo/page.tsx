import type { Metadata } from "next";
import { CatalogGrid } from "@/components/product/CatalogGrid";
import { getCategories, getVisibleProducts } from "@/lib/products";
import type { ProductCategory } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale).catalog;
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function CatalogoPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ cat?: string }>;
}) {
  const { locale } = await params;
  const { cat } = await searchParams;
  const t = getDictionary(locale).catalog;
  const products = getVisibleProducts();
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-display uppercase text-cream text-4xl sm:text-5xl mb-8">
        {t.pageTitle}
      </h1>
      <CatalogGrid
        products={products}
        categories={categories}
        initialCategory={cat as ProductCategory | undefined}
        locale={locale}
      />
    </div>
  );
}
