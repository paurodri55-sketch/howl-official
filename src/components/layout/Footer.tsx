import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-line bg-ink-soft">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl text-cream">HOWL</p>
            <p className="mt-2 text-sm text-cream-dim max-w-xs">
              Ropa de diseño propio. Algodón pesado, estampados trabajados a
              mano, tiradas limitadas.
            </p>
            <p className="mt-5 font-condensed uppercase tracking-widest text-xs text-cream-dim/70 mb-2">
              Acceso anticipado a nuevas tiradas
            </p>
            <NewsletterForm variant="footer" source="footer" />
          </div>

          <div>
            <p className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-3">
              Tienda
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalogo" className="hover:text-rust-light">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/carrito" className="hover:text-rust-light">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-3">
              Envíos y devoluciones
            </p>
            <ul className="space-y-2 text-sm text-cream-dim">
              <li>Envío gratis a partir de 50 €</li>
              <li>Entrega en 3–5 días laborables</li>
              <li>Devoluciones gratuitas hasta 30 días</li>
            </ul>
          </div>

          <div>
            <p className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-3">
              Síguenos
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.instagram.com/howlofficial_/"
                  className="flex items-center gap-2 hover:text-rust-light"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-none stroke-current"
                    strokeWidth={1.6}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@howlofficial"
                  className="flex items-center gap-2 hover:text-rust-light"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M16.5 3c.3 1.9 1.5 3.3 3.5 3.6v2.6c-1.3 0-2.5-.4-3.5-1.1v6.6c0 3-2.4 5.3-5.3 5.3S5.9 17.6 5.9 14.6c0-2.9 2.3-5.2 5.1-5.3v2.7c-1.4.1-2.5 1.3-2.5 2.7 0 1.5 1.2 2.7 2.7 2.7s2.7-1.2 2.7-2.7V3h2.6z" />
                  </svg>
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-ink-line pt-6 flex flex-col gap-2 text-xs text-cream-dim/70">
          <p>© {new Date().getFullYear()} HOWL. Todos los derechos reservados.</p>
          <p>
            Marcas, bandas y colecciones son ficticias. Proyecto de
            demostración sin afiliación con marcas o artistas reales.
          </p>
        </div>
      </div>
    </footer>
  );
}
