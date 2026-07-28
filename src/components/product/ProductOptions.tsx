"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/components/cart/CartContext";
import { Button } from "@/components/ui/Button";

export function ProductOptions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  function handleAddToCart() {
    addItem(product, size, color, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-2">
          Color — {color.name}
        </p>
        <div className="flex gap-2">
          {product.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              aria-label={c.name}
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

      <div>
        <p className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-2">
          Talla — {size}
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

      <div>
        <p className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-2">
          Cantidad
        </p>
        <div className="inline-flex items-center border border-cream/30">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-cream-dim hover:text-cream"
            aria-label="Reducir cantidad"
          >
            −
          </button>
          <span className="px-4 font-condensed text-cream">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            className="px-3 py-2 text-cream-dim hover:text-cream"
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
      </div>

      <Button onClick={handleAddToCart} className="w-full sm:w-auto">
        {justAdded ? "Añadido ✓" : "Añadir al carrito"}
      </Button>
    </div>
  );
}
