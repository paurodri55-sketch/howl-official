"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { TeeMockup } from "@/components/product/TeeMockup";
import { LinkButton } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { useLocale, withLocale } from "@/lib/i18n/client";

export default function CarritoPage() {
  const locale = useLocale();
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 text-center">
        <h1 className="font-display uppercase text-cream text-4xl mb-4">
          Tu carrito está vacío
        </h1>
        <p className="text-cream-dim mb-8">
          Todavía no has metido nada en la furgoneta de gira.
        </p>
        <LinkButton href={withLocale("/catalogo", locale)}>Ir al catálogo</LinkButton>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="font-display uppercase text-cream text-4xl sm:text-5xl mb-8">
        Carrito
      </h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <ul className="divide-y divide-ink-line border-y border-ink-line">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4 py-5">
              <Link
                href={withLocale(`/producto/${item.slug}`, locale)}
                className="shrink-0 w-20 h-20"
              >
                <TeeMockup
                  product={item}
                  color={item.color}
                  className="w-20 h-20"
                  tiny
                />
              </Link>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={withLocale(`/producto/${item.slug}`, locale)}
                      className="font-condensed uppercase tracking-wide text-cream hover:text-rust-light"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-cream-dim mt-0.5">
                      {item.band} · {item.color.name} · Talla {item.size}
                    </p>
                  </div>
                  <p className="font-condensed text-cream whitespace-nowrap">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-4">
                  <div className="inline-flex items-center border border-cream/30">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="px-2.5 py-1 text-cream-dim hover:text-cream"
                      aria-label="Reducir cantidad"
                    >
                      −
                    </button>
                    <span className="px-3 font-condensed text-sm text-cream">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-2.5 py-1 text-cream-dim hover:text-cream"
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-xs uppercase tracking-widest text-cream-dim hover:text-rust-light"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="h-max border border-ink-line bg-ink-soft p-6">
          <p className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-4">
            Resumen
          </p>
          <div className="flex justify-between text-sm text-cream-dim mb-2">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-cream-dim mb-4">
            <span>Envío</span>
            <span>Se calcula en el checkout</span>
          </div>
          <div className="flex justify-between font-condensed text-lg text-cream border-t border-ink-line pt-4 mb-6">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <LinkButton href={withLocale("/checkout", locale)} className="w-full">
            Finalizar compra
          </LinkButton>
          <p className="mt-4 text-xs text-cream-dim text-center">
            🎁 Sticker HOWL de regalo en cada pedido.{" "}
            <Link href={withLocale("/catalogo?cat=Stickers", locale)} className="text-rust-light hover:underline">
              Descubre la colección de stickers
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
