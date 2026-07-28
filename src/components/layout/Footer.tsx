import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-line bg-ink-soft">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-2xl text-cream">ÓXIDO</p>
            <p className="mt-2 text-sm text-cream-dim max-w-xs">
              Camisetas de gira que nunca existió. Algodón pesado, serigrafía
              envejecida, tiradas limitadas.
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
              Info
            </p>
            <p className="text-sm text-cream-dim max-w-xs">
              Bandas, giras y años son ficticios. Proyecto de demostración sin
              afiliación con artistas reales.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-ink-line pt-6 text-xs text-cream-dim/70">
          © {new Date().getFullYear()} ÓXIDO. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
