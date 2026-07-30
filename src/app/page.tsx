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
import Link from "next/link";
import Image from "next/image";

const lookbook = [
  { slug: "answer-the-call-wolf", photo: "/photos/models/wolfmoon-front-black.png" },
  { slug: "swamp-crocodile", photo: "/photos/models/croc_lake-back.png" },
  { slug: "wild-west-cowboy", photo: "/photos/models/cowboy-front-black.png" },
  { slug: "ufo-obsession", photo: "/photos/models/ufo_chest-front-black.png" },
  { slug: "hollow-saints-midnight-mass", photo: "/photos/models/moon-front-black.png" },
  { slug: "tradition-innovation-crane", photo: "/photos/models/japan_crane-front-black.png" },
];

// Nombres del marquee derivados de los productos reales, para que nunca
// quede desactualizado cuando se añaden o retiran diseños.
const marqueeBands = Array.from(
  new Set(getAllProducts().map((p) => p.band.toUpperCase()))
);

const categoryTiles = [
  { category: "Camisetas" as const, slug: "rattlesnake-kings-scorched-earth" },
  { category: "Sudaderas" as const, slug: "midnight-combine-harvest-of-noise" },
  { category: "Stickers" as const, slug: "sticker-wolf-badge" },
];

const testimonials = [
  {
    name: "Marcos R.",
    quote:
      "La tela es densa de verdad, no como esas camisetas finas de otras tiendas. El estampado del escorpión parece serigrafiado a mano.",
    rating: 5,
  },
  {
    name: "Elena V.",
    quote:
      "Pedí la de Hollow Saints y llegó en 3 días. La luna gótica se ve brutal en persona, mejor que en las fotos.",
    rating: 5,
  },
  {
    name: "Diego T.",
    quote:
      "Tirada limitada de verdad — quise repetir color y ya no estaba. Al menos el envío fue rápido.",
    rating: 4,
  },
];

export default function Home() {
  const featured = getFeaturedProducts();
  const newArrivals = getNewProducts();

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
          <Logo className="mx-auto mb-4 h-16 w-auto sm:h-20" />
          <p className="font-condensed uppercase tracking-[0.4em] text-xs text-rust-light mb-4">
            Diseños propios · Edición limitada
          </p>
          <h1 className="font-display uppercase leading-[0.9] text-cream text-5xl sm:text-7xl md:text-8xl">
            Ropa con
            <br />sello propio
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-cream-dim text-base sm:text-lg">
            Camisetas y sudaderas de diseño propio. Algodón pesado, estampados
            trabajados a mano y tiradas que no vuelven.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <LinkButton href="/catalogo">Ver catálogo</LinkButton>
            <LinkButton href="#destacados" variant="outline">
              Destacados
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
            Compra por categoría
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
                  href={`/catalogo?cat=${encodeURIComponent(category)}`}
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
                      Ver →
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Novedades */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display uppercase text-cream text-3xl sm:text-4xl">
              Novedades
            </h2>
            <LinkButton href="/catalogo" variant="ghost" className="px-0">
              Ver todo →
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

      {/* Lookbook */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="font-display uppercase text-cream text-3xl sm:text-4xl mb-2">
            Así se ven puestas
          </h2>
          <p className="text-cream-dim text-sm mb-8">
            Antes de comprar, mira cómo sientan de verdad.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {lookbook.map(({ slug, photo }, i) => {
            const product = getProductBySlug(slug);
            if (!product) return null;
            return (
              <Reveal key={slug} delay={(i % 3) * 100}>
                <Link href={`/producto/${slug}`} className="group block">
                  <div className="relative aspect-[4/5] w-full overflow-hidden border border-ink-line bg-ink-soft">
                    <Image
                      src={photo}
                      alt={product.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-2 font-condensed uppercase tracking-wide text-cream text-sm">
                    {product.name}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Destacados */}
      <section id="destacados" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display uppercase text-cream text-3xl sm:text-4xl">
              Destacados
            </h2>
            <LinkButton href="/catalogo" variant="ghost" className="px-0">
              Ver todo →
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
          {[
            {
              title: "Algodón 240–320 g/m²",
              text: "Percha ancha, corte clásico. Nada de camisetas de papel.",
            },
            {
              title: "Serigrafía envejecida",
              text: "Lavado ácido y craquelado a mano para que parezca que sobrevivió a la gira.",
            },
            {
              title: "Tiradas limitadas",
              text: "Cada diseño se imprime una vez. Cuando se agota, no vuelve.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 100}>
              <p className="font-condensed uppercase tracking-widest text-rust-light text-sm mb-2">
                {item.title}
              </p>
              <p className="text-cream-dim text-sm">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonios */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="font-display uppercase text-cream text-3xl sm:text-4xl mb-8">
            Lo que dice quien ya pidió
          </h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 100}
              className="border border-ink-line bg-ink-soft p-6"
            >
              <StarRating rating={t.rating} className="mb-3" />
              <p className="text-cream-dim text-sm leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-4 font-condensed uppercase tracking-widest text-xs text-rust-light">
                {t.name}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 text-center">
        <Reveal>
          <h2 className="font-display uppercase text-cream text-3xl sm:text-5xl">
            Nueva colección en la calle
          </h2>
          <p className="mt-4 text-cream-dim">
            Antes de que se agote la talla M, otra vez.
          </p>
          <div className="mt-8">
            <LinkButton href="/catalogo">Entrar a la tienda</LinkButton>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
