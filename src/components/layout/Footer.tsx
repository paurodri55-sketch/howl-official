import Link from "next/link";

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
                  href="#"
                  className="hover:text-rust-light"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-rust-light"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
