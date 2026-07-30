import type { Metadata } from "next";
import { CatalogGrid } from "@/components/product/CatalogGrid";
import { getCategories, getVisibleProducts } from "@/lib/products";
import type { ProductCategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "Catálogo — HOWL",
  description: "Todas las camisetas, sudaderas y accesorios de HOWL.",
};

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const products = getVisibleProducts();
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-display uppercase text-cream text-4xl sm:text-5xl mb-8">
        Catálogo
      </h1>
      <CatalogGrid
        products={products}
        categories={categories}
        initialCategory={cat as ProductCategory | undefined}
      />
    </div>
  );
}
