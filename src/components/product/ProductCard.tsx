import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { TeeArt } from "@/components/product/TeeArt";
import { Badge } from "@/components/ui/Badge";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group flex flex-col"
    >
      <div className="relative">
        <TeeArt
          band={product.band}
          tourYear={product.tourYear}
          graphic={product.graphic}
          className="aspect-[4/5] w-full transition-transform duration-300 group-hover:scale-[1.02]"
        />
        {(product.isNew || product.featured) && (
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <Badge>Nuevo</Badge>}
          </div>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <p className="font-condensed uppercase tracking-wide text-cream text-sm">
            {product.name}
          </p>
          <p className="text-cream-dim text-xs">{product.band}</p>
        </div>
        <p className="font-condensed text-rust-light text-sm whitespace-nowrap">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
