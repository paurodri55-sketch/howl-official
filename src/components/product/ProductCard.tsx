import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { isDarkGarment, pickShowcaseColor } from "@/lib/color";
import { TeeMockup } from "@/components/product/TeeMockup";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { getProductPhoto } from "@/lib/photos";
import { SHOW_SOCIAL_PROOF } from "@/lib/config";

export function ProductCard({ product }: { product: Product }) {
  const showcaseColor = pickShowcaseColor(product);
  const photo = getProductPhoto(product, showcaseColor);

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group flex flex-col"
    >
      <div className="relative">
        {photo ? (
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-ink-line bg-ink-soft">
            <Image
              src={photo}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
            />
          </div>
        ) : (
          <TeeMockup
            product={product}
            color={showcaseColor}
            className="aspect-[4/5] w-full transition-transform duration-300 group-hover:scale-[1.02]"
            compact
            lift={isDarkGarment(showcaseColor.hex)}
          />
        )}
        {(product.isNew || (SHOW_SOCIAL_PROOF && (product.purchases ?? 0) > 500)) && (
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {SHOW_SOCIAL_PROOF && (product.purchases ?? 0) > 500 && <Badge>Más vendido</Badge>}
            {product.isNew && <Badge>Nuevo</Badge>}
          </div>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-condensed uppercase tracking-wide text-cream text-sm truncate">
            {product.name}
          </p>
          <p className="text-cream-dim text-xs truncate">{product.band}</p>
          {SHOW_SOCIAL_PROOF && product.rating !== undefined && (
            <div className="mt-1 flex items-center gap-1.5 flex-wrap">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} />
              {(product.purchases ?? 0) > 500 && (
                <span className="font-condensed text-[10px] text-rust-light">
                  · {new Intl.NumberFormat("es-ES").format(product.purchases!)} vendidas
                </span>
              )}
            </div>
          )}
        </div>
        <div className="text-right whitespace-nowrap shrink-0">
          <p className="font-condensed text-rust-light text-sm">
            {formatPrice(product.price)}
          </p>
          {product.compareAtPrice && (
            <p className="font-condensed text-cream-dim/60 text-xs line-through">
              {formatPrice(product.compareAtPrice)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
