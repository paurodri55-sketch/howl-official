import type { GraphicIcon, LogoStyle } from "@/lib/types";
import { GraphicIconSvg } from "@/components/product/graphicIcons";

interface PrintMarkProduct {
  band: string;
  graphic: GraphicIcon;
  logoStyle: LogoStyle;
  artworkImage?: string;
  tagline?: string;
  tourYear: string;
  /** Si es true, omite el recuadro de ilustración (solo tipografía). */
  textOnly?: boolean;
}

const sizeConfig = {
  sm: { band: "1rem", tagline: "0.4rem", frame: 76, year: "0.4rem" },
  md: { band: "2.25rem", tagline: "0.65rem", frame: 160, year: "0.55rem" },
  lg: { band: "3.5rem", tagline: "0.85rem", frame: 220, year: "0.7rem" },
};

export function PrintMark({
  product,
  ink,
  size = "md",
}: {
  product: PrintMarkProduct;
  ink: string;
  size?: "sm" | "md" | "lg";
}) {
  const cfg = sizeConfig[size];
  const accentColor = product.logoStyle.accentColor ?? ink;
  // Autoescala el nombre de banda para que los nombres largos ("MIDNIGHT COMBINE")
  // no se desborden del área de estampado como los cortos ("DJO").
  const lengthScale = Math.min(1.15, Math.max(0.55, 11 / product.band.length));
  const bandFontSize = `${parseFloat(cfg.band) * lengthScale}rem`;

  return (
    <div
      className="flex flex-col items-center gap-1 text-center pointer-events-none"
      style={{ color: ink }}
    >
      <p
        className="font-display uppercase font-black leading-[0.82] whitespace-nowrap"
        style={{
          fontSize: bandFontSize,
          transform: product.logoStyle.skew ? `skewX(${product.logoStyle.skew}deg)` : undefined,
        }}
      >
        {product.band}
      </p>

      {product.tagline && (
        <p
          className="uppercase font-bold leading-tight max-w-[85%] whitespace-pre-line"
          style={{ fontSize: cfg.tagline, color: accentColor, letterSpacing: "0.08em" }}
        >
          {product.tagline}
        </p>
      )}

      {!product.textOnly && (
        <div
          className="relative flex items-center justify-center"
          style={{ width: cfg.frame, height: cfg.frame }}
        >
          {product.artworkImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.artworkImage}
              alt=""
              className="w-full h-full object-contain"
            />
          ) : (
            <GraphicIconSvg
              graphic={product.graphic}
              ink={ink}
              className="w-full h-full"
            />
          )}
          {product.tourYear && (
            <span
              className="absolute uppercase font-bold px-1"
              style={{
                fontSize: cfg.year,
                bottom: 2,
                right: -2,
                backgroundColor: accentColor,
                color: "#100d0a",
              }}
            >
              {product.tourYear}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
