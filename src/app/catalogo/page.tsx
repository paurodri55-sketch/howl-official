import type { Metadata } from "next";
import { CatalogGrid } from "@/components/product/CatalogGrid";
import { getAllProducts, getCategories } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catálogo — ÓXIDO",
  description: "Todas las camisetas, sudaderas y accesorios de ÓXIDO.",
};

export default function CatalogoPage() {
  const products = getAllProducts();
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-display uppercase text-cream text-4xl sm:text-5xl mb-8">
        Catálogo
      </h1>
      <CatalogGrid products={products} categories={categories} />
    </div>
  );
}
