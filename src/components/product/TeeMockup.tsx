import type { GraphicIcon, LogoStyle, ProductColor } from "@/lib/types";
import { getPrintInk } from "@/lib/color";
import { grainDataUri } from "@/lib/texture";
import { PrintMark } from "@/components/product/PrintMark";
import { GraphicIconSvg } from "@/components/product/graphicIcons";

interface TeeMockupProduct {
  band: string;
  graphic: GraphicIcon;
  logoStyle: LogoStyle;
  tourYear: string;
  artworkImage?: string;
  backArtworkImage?: string;
  backBand?: string;
  frontLogoOnly?: boolean;
  textOnly?: boolean;
  tagline?: string;
  editionLabel?: string;
}

const FRONT_BODY =
  "M-6,62 C-10,48 -6,36 0,30 C12,16 24,8 35,4 L110,6 Q125,28 140,6 L215,4 C226,8 238,16 250,30 C256,36 260,48 256,62 L230,70 C222,78 216,80 210,82 L210,290 L40,290 L40,82 C34,80 28,78 20,70 Z";
const BACK_BODY =
  "M-6,62 C-10,48 -6,36 0,30 C12,16 24,8 35,4 L110,10 Q125,16 140,10 L215,4 C226,8 238,16 250,30 C256,36 260,48 256,62 L230,70 C222,78 216,80 210,82 L210,290 L40,290 L40,82 C34,80 28,78 20,70 Z";
const FRONT_COLLAR = "M110,6 Q125,28 140,6";
const BACK_COLLAR = "M110,10 Q125,16 140,10";
const LEFT_UNDERARM_SEAM = "M20,70 C28,78 34,80 40,82";
const RIGHT_UNDERARM_SEAM = "M230,70 C222,78 216,80 210,82";

export function TeeMockup({
  product,
  color,
  view = "front",
  className = "",
  compact = false,
  tiny = false,
  lift = false,
}: {
  product: TeeMockupProduct;
  color: ProductColor;
  view?: "front" | "back";
  className?: string;
  compact?: boolean;
  /** Miniatura muy pequeña (carrito): solo icono, sin wordmark. */
  tiny?: boolean;
  /** Separa visualmente la tarjeta del fondo cuando la prenda es oscura. */
  lift?: boolean;
}) {
  const ink = getPrintInk(color.hex);
  const body = view === "front" ? FRONT_BODY : BACK_BODY;
  const collar = view === "front" ? FRONT_COLLAR : BACK_COLLAR;

  const frontLogoOnly = view === "front" && product.frontLogoOnly && !tiny;

  const printWrapperStyle = tiny
    ? { top: "26%", left: "50%", width: "46%", transform: "translateX(-50%)" }
    : frontLogoOnly
      ? { top: "27%", left: "59%", width: "24%", transform: "translateX(-50%)" }
      : view === "front"
        ? {
            top: "28%",
            left: "50%",
            width: compact ? "54%" : "48%",
            transform: "translateX(-50%)",
          }
        : {
            top: "20%",
            left: "50%",
            width: compact ? "58%" : "52%",
            transform: "translateX(-50%)",
          };

  return (
    <div
      className={`relative bg-ink-soft overflow-hidden ${lift ? "border border-cream/20" : "border border-ink-line"} ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay"
        style={{ backgroundImage: `url("${grainDataUri}")` }}
      />

      <svg viewBox="-14 -6 288 306" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="fold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.14" />
            <stop offset="30%" stopColor="#fff" stopOpacity="0" />
            <stop offset="70%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.24" />
          </linearGradient>
        </defs>
        <path
          d={body}
          fill={color.hex}
          stroke="rgba(0,0,0,0.35)"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        <path d={body} fill="url(#fold)" />
        <path
          d={collar}
          fill="none"
          stroke="rgba(0,0,0,0.3)"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <path
          d={LEFT_UNDERARM_SEAM}
          fill="none"
          stroke="rgba(0,0,0,0.16)"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <path
          d={RIGHT_UNDERARM_SEAM}
          fill="none"
          stroke="rgba(0,0,0,0.16)"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <line
          x1={40}
          y1={82}
          x2={40}
          y2={290}
          stroke="rgba(0,0,0,0.1)"
          strokeWidth={1.5}
        />
        <line
          x1={210}
          y1={82}
          x2={210}
          y2={290}
          stroke="rgba(0,0,0,0.1)"
          strokeWidth={1.5}
        />
      </svg>

      <div className="absolute flex flex-col items-center" style={printWrapperStyle}>
        {tiny ? (
          product.artworkImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.artworkImage}
              alt=""
              className="w-full h-auto pointer-events-none object-contain"
            />
          ) : (
            <GraphicIconSvg
              graphic={product.graphic}
              ink={ink}
              className="w-full h-auto pointer-events-none"
            />
          )
        ) : frontLogoOnly ? (
          product.textOnly ? (
            <PrintMark
              product={{ ...product, tagline: undefined }}
              ink={ink}
              size="sm"
            />
          ) : product.artworkImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.artworkImage}
              alt=""
              className="w-full h-auto pointer-events-none object-contain"
            />
          ) : (
            <GraphicIconSvg
              graphic={product.graphic}
              ink={ink}
              className="w-full h-auto pointer-events-none"
            />
          )
        ) : view === "front" ? (
          <PrintMark product={product} ink={ink} size={compact ? "sm" : "md"} />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <PrintMark
              product={{
                ...product,
                band: product.backBand ?? product.band,
                artworkImage: product.backArtworkImage ?? product.artworkImage,
              }}
              ink={ink}
              size={compact ? "sm" : "md"}
            />
            {product.tourYear && (
              <p
                className="font-condensed uppercase tracking-[0.3em] text-[8px] sm:text-[9px] opacity-80 whitespace-nowrap"
                style={{ color: ink }}
              >
                {product.editionLabel ?? "World Tour"} {product.tourYear}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
