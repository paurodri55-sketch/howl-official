import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { TeeArt } from "@/components/product/TeeArt";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductOptions } from "@/components/product/ProductOptions";
import { Badge } from "@/components/ui/Badge";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado — ÓXIDO" };
  return {
    title: `${product.name} — ${product.band} — ÓXIDO`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <nav className="text-xs text-cream-dim mb-8 font-condensed uppercase tracking-widest">
        <Link href="/catalogo" className="hover:text-cream">
          Catálogo
        </Link>{" "}
        / <span className="text-cream">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <TeeArt
          band={product.band}
          tourYear={product.tourYear}
          graphic={product.graphic}
          className="aspect-square w-full"
        />

        <div>
          {product.isNew && (
            <div className="mb-3">
              <Badge>Nuevo</Badge>
            </div>
          )}
          <p className="font-condensed uppercase tracking-widest text-sm text-rust-light">
            {product.band} · Gira {product.tourYear}
          </p>
          <h1 className="font-display uppercase text-cream text-4xl sm:text-5xl mt-1">
            {product.name}
          </h1>
          <p className="font-condensed text-2xl text-cream mt-4">
            {formatPrice(product.price)}
          </p>
          <p className="mt-4 text-cream-dim leading-relaxed">
            {product.description}
          </p>

          <div className="mt-8">
            <ProductOptions product={product} />
          </div>

          <ul className="mt-10 space-y-1.5 border-t border-ink-line pt-6 text-sm text-cream-dim">
            {product.details.map((detail) => (
              <li key={detail} className="flex gap-2">
                <span className="text-rust">—</span>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display uppercase text-cream text-2xl sm:text-3xl mb-6">
            También te puede interesar
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
