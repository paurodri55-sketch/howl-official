import { LinkButton } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { getFeaturedProducts } from "@/lib/products";

const marqueeBands = [
  "BLACK ORCHARD",
  "WIDOW'S PEAK",
  "DUST BOWL PROPHETS",
  "COYOTE WIRE",
  "HOLLOW SAINTS",
  "IRON MAGNOLIA",
  "MIDNIGHT COMBINE",
  "GRAVEL & GLORY",
  "THE RUSTBELT CHOIR",
];

export default function Home() {
  const featured = getFeaturedProducts();

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
          <p className="font-condensed uppercase tracking-[0.4em] text-xs text-rust-light mb-4">
            Merch de gira · Edición limitada
          </p>
          <h1 className="font-display uppercase leading-[0.9] text-cream text-5xl sm:text-7xl md:text-8xl">
            Ropa que huele
            <br />a backstage
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-cream-dim text-base sm:text-lg">
            Camisetas y sudaderas de giras que nunca existieron. Algodón
            pesado, serigrafía envejecida a mano y tiradas que no vuelven.
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

      {/* Destacados */}
      <section id="destacados" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display uppercase text-cream text-3xl sm:text-4xl">
            Destacados
          </h2>
          <LinkButton href="/catalogo" variant="ghost" className="px-0">
            Ver todo →
          </LinkButton>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Por qué ÓXIDO */}
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
          ].map((item) => (
            <div key={item.title}>
              <p className="font-condensed uppercase tracking-widest text-rust-light text-sm mb-2">
                {item.title}
              </p>
              <p className="text-cream-dim text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 text-center">
        <h2 className="font-display uppercase text-cream text-3xl sm:text-5xl">
          Nueva colección en la calle
        </h2>
        <p className="mt-4 text-cream-dim">
          Antes de que se agote la talla M, otra vez.
        </p>
        <div className="mt-8">
          <LinkButton href="/catalogo">Entrar a la tienda</LinkButton>
        </div>
      </section>
    </div>
  );
}
