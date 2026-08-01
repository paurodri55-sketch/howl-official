import { LinkButton } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { TeeMockup } from "@/components/product/TeeMockup";
import { StarRating } from "@/components/ui/StarRating";
import { Reveal } from "@/components/ui/Reveal";
import { isDarkGarment } from "@/lib/color";
import {
  getAllProducts,
  getFeaturedProducts,
  getNewProducts,
  getProductBySlug,
} from "@/lib/products";
import { getProductPhoto } from "@/lib/photos";
import { Logo } from "@/components/ui/Logo";
import { NewsletterSection } from "@/components/newsletter/NewsletterSection";
import { SHOW_SOCIAL_PROOF } from "@/lib/config";
import { getDaysUntilLaunch } from "@/lib/launch";
import Link from "next/link";
import Image from "next/image";
import { withLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

// Nombres del marquee derivados de los productos reales, para que nunca
// quede desactualizado cuando se añaden o retiran diseños.
const marqueeBands = Array.from(
  new Set(getAllProducts().map((p) => p.band.toUpperCase()))
);

const categoryTiles = [
  { category: "Camisetas" as const, slug: "answer-the-call-wolf" },
  { category: "Sudaderas" as const, slug: "midnight-combine-harvest-of-noise" },
  { category: "Stickers" as const, slug: "sticker-wolf-badge" },
];

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getDictionary(locale).home;
  const featured = getFeaturedProducts();
  const newArrivals = getNewProducts();
  const daysUntilLaunch = getDaysUntilLaunch();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-line">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 0%, rgba(181,80,46,0.25), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-24 text-center">
          <Logo className="mx-auto mb-4 h-24 w-auto sm:h-32" />
          <p className="font-condensed uppercase tracking-[0.4em] text-xs text-rust-light mb-4">
            {t.heroEyebrow}
          </p>
          <h1 className="font-display uppercase leading-[0.9] text-cream text-5xl sm:text-7xl md:text-8xl">
            {t.heroHeading1}
            <br />{t.heroHeading2}
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-cream-dim text-base sm:text-lg">
            {t.heroBody}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <LinkButton href={withLocale("/catalogo", locale)}>{t.heroCtaCatalog}</LinkButton>
            <LinkButton href="#destacados" variant="outline">
              {t.heroCtaFeatured}
            </LinkButton>
          </div>
        </div>

        <div className="relative border-t border-ink-line bg-ink-soft py-3 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee w-max">
            {[...marqueeBands, ...marqueeBands].map((band, i) => (
              <span
                key={`${band}-${i}`}
                className="font-condensed uppercase tracking-widest text-sm text-cream-dim mx-6"
              >
                {band} <span className="text-rust mx-6">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="font-display uppercase text-cream text-3xl sm:text-4xl mb-8">
            {t.categoryHeading}
          </h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-3">
          {categoryTiles.map(({ category, slug }, i) => {
            const product = getProductBySlug(slug);
            if (!product) return null;
            const color = product.colors[0];
            const photo = getProductPhoto(product, color);
            return (
              <Reveal key={category} delay={i * 100}>
                <Link
                  href={withLocale(`/catalogo?cat=${encodeURIComponent(category)}`, locale)}
                  className="group relative block overflow-hidden border border-ink-line"
                >
                  {photo ? (
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <Image
                        src={photo}
                        alt={category}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ) : (
                    <TeeMockup
                      product={product}
                      color={color}
                      compact
                      lift={isDarkGarment(color.hex)}
                      className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-80" />
                  <div className="absolute inset-x-0 bottom-0 p-5 flex items-center justify-between">
                    <p className="font-display uppercase text-cream text-xl">
                      {category}
                    </p>
                    <span className="font-condensed text-cream-dim text-sm transition-transform duration-300 group-hover:translate-x-1">
                      {t.viewArrow}
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Cuenta atrás */}
      <section className="border-y border-ink-line bg-ink">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 text-center">
          <Reveal>
            <p className="font-condensed uppercase tracking-[0.4em] text-xs text-rust-light mb-4">
              {t.countdownEyebrow}
            </p>
            <h2 className="font-display uppercase text-cream text-3xl sm:text-4xl">
              {t.countdownHeading}
            </h2>
            <p className="mt-6 font-display text-cream text-8xl sm:text-9xl leading-none">
              {daysUntilLaunch}
            </p>
            <p className="font-condensed uppercase tracking-widest text-sm text-cream-dim mt-1">
              {t.countdownDaysLabel}
            </p>
            <p className="mt-6 text-cream-dim text-sm sm:text-base">
              {t.countdownBody}
            </p>
            <div className="mt-8">
              <LinkButton href="#newsletter" variant="ghost">
                {t.countdownCta}
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Novedades */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display uppercase text-cream text-3xl sm:text-4xl">
              {t.newArrivalsHeading}
            </h2>
            <LinkButton href={withLocale("/catalogo", locale)} variant="ghost" className="px-0">
              {t.viewAllLabel}
            </LinkButton>
          </div>
        </Reveal>
        <div className="flex gap-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4">
          {newArrivals.map((product, i) => (
            <Reveal
              key={product.id}
              delay={(i % 4) * 80}
              className="w-40 shrink-0 sm:w-auto"
            >
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Destacados */}
      <section id="destacados" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display uppercase text-cream text-3xl sm:text-4xl">
              {t.featuredHeading}
            </h2>
            <LinkButton href={withLocale("/catalogo", locale)} variant="ghost" className="px-0">
              {t.viewAllLabel}
            </LinkButton>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={(i % 4) * 80}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Por qué HOWL */}
      <section className="border-y border-ink-line bg-ink-soft">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 grid gap-10 sm:grid-cols-3">
          {t.whyHowl.map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <p className="font-condensed uppercase tracking-widest text-rust-light text-sm mb-2">
                {item.title}
              </p>
              <p className="text-cream-dim text-sm">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <NewsletterSection locale={locale} />

      {/* Testimonios */}
      {SHOW_SOCIAL_PROOF && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <h2 className="font-display uppercase text-cream text-3xl sm:text-4xl mb-8">
              {t.testimonialsHeading}
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {t.testimonials.map((item, i) => (
              <Reveal
                key={item.name}
                delay={i * 100}
                className="border border-ink-line bg-ink-soft p-6"
              >
                <StarRating rating={item.rating} className="mb-3" />
                <p className="text-cream-dim text-sm leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="mt-4 font-condensed uppercase tracking-widest text-xs text-rust-light">
                  {item.name}
                </p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 text-center">
        <Reveal>
          <h2 className="font-display uppercase text-cream text-3xl sm:text-5xl">
            {t.finalCtaHeading}
          </h2>
          <p className="mt-4 text-cream-dim">
            {t.finalCtaBody}
          </p>
          <div className="mt-8">
            <LinkButton href={withLocale("/catalogo", locale)}>{t.finalCtaButton}</LinkButton>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
