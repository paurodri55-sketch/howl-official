"use client";

import { useState } from "react";
import type { Product, ProductCategory } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { RatingSummary } from "@/lib/reviews";

export function CatalogGrid({
  products,
  categories,
  initialCategory,
  locale,
  ratingSummaries,
}: {
  products: Product[];
  categories: ProductCategory[];
  initialCategory?: ProductCategory;
  locale: Locale;
  ratingSummaries?: Record<string, RatingSummary>;
}) {
  const [active, setActive] = useState<ProductCategory | "Todos">(
    initialCategory ?? "Todos"
  );
  const t = getDictionary(locale).catalog;

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
            {cat === "Todos" ? t.all : t.categoryLabels[cat]}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-cream-dim">{t.empty}</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              ratingSummary={ratingSummaries?.[product.slug]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
