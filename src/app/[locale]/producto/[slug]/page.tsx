import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { getProductPhoto } from "@/lib/photos";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductViewer } from "@/components/product/ProductViewer";
import { withLocale, type Locale } from "@/lib/i18n/config";
import { SITE_URL, OG_LOCALE, buildAlternates } from "@/lib/seo";
import { SHOW_SOCIAL_PROOF } from "@/lib/config";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado — HOWL" };

  const title = `${product.name} — ${product.band} — HOWL`;
  const description =
    (locale === "en" && product.descriptionEn) || product.description;
  const path = `/producto/${slug}`;
  const image = getProductPhoto(product, product.colors[0]);

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      url: `${SITE_URL}/${locale}${path}`,
      title,
      description,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}) {
  const { slug, locale } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const image = getProductPhoto(product, product.colors[0]);
  const productUrl = `${SITE_URL}/${locale}/producto/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      (locale === "en" && product.descriptionEn) || product.description,
    image: image ? [`${SITE_URL}${image}`] : undefined,
    url: productUrl,
    brand: { "@type": "Brand", name: "HOWL" },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "EUR",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    ...(SHOW_SOCIAL_PROOF && product.rating && product.reviewCount
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
        }
      : {}),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12 sm:px-6">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="text-xs text-cream-dim mb-8 font-condensed uppercase tracking-widest">
        <Link href={withLocale("/catalogo", locale)} className="hover:text-cream">
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
