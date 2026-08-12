"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { useCart } from "@/components/cart/CartContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TeeMockup } from "@/components/product/TeeMockup";
import { PrintArt } from "@/components/product/PrintArt";
import { StarRating } from "@/components/ui/StarRating";
import { formatPrice } from "@/lib/format";
import { getBackProductPhoto, getProductPhoto } from "@/lib/photos";
import { SHOW_SOCIAL_PROOF } from "@/lib/config";
import { useLocale } from "@/lib/i18n/client";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { RatingSummary } from "@/lib/reviews";

type View = "foto" | "front" | "back" | "diseno";

// La foto de modelo se generó con la prenda en negro; se muestra siempre,
// como referencia de estilo, independientemente del color seleccionado.
const MODEL_COLOR_NOTE = "Negro desteñido";

export function ProductViewer({
  product,
  ratingSummary,
}: {
  product: Product;
  ratingSummary?: RatingSummary | null;
}) {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const t = dict.viewer;
  const viewLabels: Record<View, string> = {
    foto: t.viewPhoto,
    front: t.viewFront,
    back: t.viewBack,
    diseno: t.viewArt,
  };
  const description =
    locale === "en" && product.descriptionEn ? product.descriptionEn : product.description;
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const photo = getProductPhoto(product, product.colors[0]);
  const [view, setView] = useState<View>(photo ? "foto" : "front");
  const [justAdded, setJustAdded] = useState(false);
  const currentPhoto = getProductPhoto(product, color);
  const backPhoto = getBackProductPhoto(product, color);
  const views = [
    ...(currentPhoto ? ["foto"] : []),
    ...(currentPhoto ? [] : ["front"]),
    ...(backPhoto || product.category === "Camisetas" || product.category === "Sudaderas"
      ? ["back"]
      : []),
    "diseno",
  ] as View[];
  const activeView = views.includes(view) ? view : views[0];

  const touchStartX = useRef<number | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    const SWIPE_THRESHOLD = 50;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    const currentIndex = views.indexOf(activeView);
    if (currentIndex === -1) return;
    const nextIndex =
      deltaX < 0
        ? (currentIndex + 1) % views.length
        : (currentIndex - 1 + views.length) % views.length;
    setView(views[nextIndex]);
  }

  function handleAddToCart() {
    addItem(product, size, color, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  }

  return (
    <div className="grid gap-6 md:gap-10 md:grid-cols-2">
      <div>
        <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {activeView === "diseno" ? (
          <PrintArt product={product} className="aspect-[4/5] w-full" />
        ) : activeView === "foto" && currentPhoto ? (
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-ink-line bg-ink-soft">
            <Image
              src={currentPhoto}
              alt={`${product.name} — foto real`}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : activeView === "back" && backPhoto ? (
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-ink-line bg-ink-soft">
            <Image
              src={backPhoto}
              alt={`${product.name} — foto real, espalda`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <TeeMockup
            product={product}
            color={color}
            view={activeView === "back" ? "back" : "front"}
            className="aspect-[4/5] w-full"
          />
        )}
        </div>
        <div className="relative">
          <div
            className="flex gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap"
            style={{ scrollbarWidth: "none" }}
          >
            {views.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={`shrink-0 whitespace-nowrap font-condensed uppercase tracking-widest text-xs px-3.5 py-2 border transition-colors ${
                  activeView === v
                    ? "border-rust bg-rust text-cream"
                    : "border-cream/30 text-cream-dim hover:border-cream"
                }`}
              >
                {viewLabels[v]}
              </button>
            ))}
          </div>
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-ink to-transparent sm:hidden" />
        </div>
        {activeView === "back" &&
          product.backHeroPhoto &&
          color.name !== MODEL_COLOR_NOTE && (
          <p className="mt-2 text-xs text-cream-dim">
            {t.referencePhotoNote(dict.colorNames["#1c1712"] ?? MODEL_COLOR_NOTE)}
          </p>
        )}
      </div>

      <div>
        {product.isNew && (
          <div className="mb-3">
            <Badge>{t.new}</Badge>
          </div>
        )}
        <p className="font-condensed uppercase tracking-widest text-sm text-rust-light">
          {product.band}
        </p>
        <h1 className="font-display uppercase text-cream text-4xl sm:text-5xl mt-1">
          {product.name}
        </h1>
        {SHOW_SOCIAL_PROOF && ratingSummary && (
          <div className="mt-2 flex items-center gap-3">
            <StarRating rating={ratingSummary.rating} reviewCount={ratingSummary.reviewCount} />
          </div>
        )}
        <p className="flex items-baseline gap-3 font-condensed text-2xl text-cream mt-4">
          {formatPrice(product.price)}
          {product.compareAtPrice && (
            <span className="text-base text-cream-dim/60 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </p>
        <p className="mt-4 text-cream-dim leading-relaxed">
          {description}
        </p>

        <div className="mt-8 flex flex-col gap-6">
          <div>
            <p className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-2">
              {t.colorLabel} — {dict.colorNames[color.hex] ?? color.name}
            </p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  aria-label={dict.colorNames[c.hex] ?? c.name}
                  onClick={() => setColor(c)}
                  className={`h-9 w-9 rounded-full border-2 transition-colors ${
                    c.name === color.name
                      ? "border-rust"
                      : "border-transparent hover:border-cream/40"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {product.sizes.length > 1 && (
            <div>
              <p className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-2">
                {t.sizeLabel} — {size}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`font-condensed uppercase tracking-wide text-sm px-3.5 py-2 border transition-colors ${
                      s === size
                        ? "border-rust bg-rust text-cream"
                        : "border-cream/30 text-cream-dim hover:border-cream"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-2">
              {t.quantityLabel}
            </p>
            <div className="inline-flex items-center border border-cream/30">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-cream-dim hover:text-cream"
                aria-label={t.decreaseAria}
              >
                −
              </button>
              <span className="px-4 font-condensed text-cream">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                className="px-3 py-2 text-cream-dim hover:text-cream"
                aria-label={t.increaseAria}
              >
                +
              </button>
            </div>
          </div>

          <div className="hidden sm:block">
            <Button onClick={handleAddToCart}>
              {justAdded ? t.added : t.addToCart}
            </Button>
          </div>
        </div>

        <ul className="mt-10 space-y-1.5 border-t border-ink-line pt-6 text-sm text-cream-dim pb-20 sm:pb-0">
          {product.details.map((detail) => (
            <li key={detail} className="flex gap-2">
              <span className="text-rust">—</span>
              {detail}
            </li>
          ))}
        </ul>
      </div>

      {/* Barra fija de compra en móvil */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-ink-line bg-ink/95 backdrop-blur px-4 py-3 flex items-center gap-3">
        <p className="font-condensed text-cream text-lg whitespace-nowrap">
          {formatPrice(product.price)}
        </p>
        <Button onClick={handleAddToCart} className="flex-1">
          {justAdded ? t.added : t.addToCart}
        </Button>
      </div>
    </div>
  );
}

