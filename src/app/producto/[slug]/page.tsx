import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductViewer } from "@/components/product/ProductViewer";

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
  if (!product) return { title: "Producto no encontrado — HOWL" };
  return {
    title: `${product.name} — ${product.band} — HOWL`,
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

      <ProductViewer product={product} />

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
