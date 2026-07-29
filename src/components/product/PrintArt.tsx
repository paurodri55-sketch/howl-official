import type { Product } from "@/lib/types";
import { PrintMark } from "@/components/product/PrintMark";
import { grainDataUri } from "@/lib/texture";

export function PrintArt({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  return (
    <div
      className={`torn-edge relative flex flex-col items-center justify-center overflow-hidden bg-ink-soft border border-ink-line px-6 py-8 ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 25%, rgba(181,80,46,0.18), transparent 60%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
        style={{ backgroundImage: `url("${grainDataUri}")` }}
      />

      <div className="pointer-events-none absolute inset-4 border border-cream/15" />

      <div className="relative flex flex-col items-center gap-4 text-center text-cream">
        {product.backTextBaked && (product.backArtworkImage ?? product.artworkImage) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.backArtworkImage ?? product.artworkImage}
            alt=""
            className="w-full max-w-xs h-auto object-contain"
          />
        ) : (
          <>
            <PrintMark
              product={{
                ...product,
                band: product.backBand ?? product.band,
                artworkImage: product.backArtworkImage ?? product.artworkImage,
              }}
              ink="#efe4c8"
              size="lg"
            />
            {product.tourYear && (
              <p className="font-condensed uppercase tracking-[0.45em] text-[11px] text-rust-light">
                {product.editionLabel ?? "World Tour"} {product.tourYear}
              </p>
            )}
          </>
        )}

        <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1.5 font-condensed text-[11px] sm:text-xs uppercase tracking-wide text-cream-dim">
          {product.tourDates.map((d) => (
            <div key={d.city} className="flex justify-between gap-4">
              <span>{d.city}</span>
              <span className="text-rust-light">{d.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
