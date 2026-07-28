"use client";

import { useState } from "react";
import type { Product, ProductCategory } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";

export function CatalogGrid({
  products,
  categories,
  initialCategory,
}: {
  products: Product[];
  categories: ProductCategory[];
  initialCategory?: ProductCategory;
}) {
  const [active, setActive] = useState<ProductCategory | "Todos">(
    initialCategory ?? "Todos"
  );

  const visible =
    active === "Todos" ? products : products.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {(["Todos", ...categories] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`font-condensed uppercase tracking-widest text-sm px-4 py-2 border transition-colors ${
              active === cat
                ? "border-rust bg-rust text-cream"
                : "border-cream/30 text-cream-dim hover:border-cream"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-cream-dim">No hay productos en esta categoría.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
