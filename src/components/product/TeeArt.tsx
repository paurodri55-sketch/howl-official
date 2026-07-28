import type { ReactElement } from "react";
import type { GraphicIcon } from "@/lib/types";

const icons: Record<GraphicIcon, () => ReactElement> = {
  bolt: () => <path d="M32 4 L12 36 H28 L22 60 L52 26 H34 L40 4 Z" />,
  skull: () => (
    <g>
      <path d="M32 6C18 6 8 16 8 29c0 8 4 14 10 18v9a3 3 0 0 0 3 3h4v-6h4v6h6v-6h4v6h4a3 3 0 0 0 3-3v-9c6-4 10-10 10-18C56 16 46 6 32 6Z" />
      <circle cx="22" cy="28" r="5" fill="var(--tee-bg, #100d0a)" stroke="none" />
      <circle cx="42" cy="28" r="5" fill="var(--tee-bg, #100d0a)" stroke="none" />
      <path d="M32 34 L28 42 H36 Z" fill="var(--tee-bg, #100d0a)" stroke="none" />
    </g>
  ),
  star: () => (
    <path d="M32 4 L39 24 H60 L43 37 L50 58 L32 45 L14 58 L21 37 L4 24 H25 Z" />
  ),
  wings: () => (
    <g>
      <path d="M32 14 C24 8 8 8 2 16 C10 18 16 22 20 28 C12 28 4 32 2 40 C12 40 20 36 26 30 C28 34 30 40 32 46" />
      <path d="M32 14 C40 8 56 8 62 16 C54 18 48 22 44 28 C52 28 60 32 62 40 C52 40 44 36 38 30 C36 34 34 40 32 46" />
    </g>
  ),
  moon: () => <path d="M40 6 A26 26 0 1 0 40 58 A21 21 0 0 1 40 6 Z" />,
  serpent: () => (
    <path
      fill="none"
      strokeWidth={3.5}
      d="M10 50 C10 38 26 38 26 26 C26 14 10 14 10 6 M10 6 h6 M10 50 h6"
    />
  ),
  cross: () => <path d="M27 4 H37 V24 H57 V34 H37 V60 H27 V34 H7 V24 H27 Z" />,
  flame: () => (
    <path d="M32 4 C24 18 14 24 14 38 C14 50 22 60 32 60 C42 60 50 50 50 38 C50 30 46 28 44 22 C42 30 36 30 36 24 C36 16 32 10 32 4 Z" />
  ),
  dove: () => (
    <path d="M6 30 C16 24 24 24 30 30 C30 18 40 10 54 10 C48 16 46 22 48 28 C54 28 58 26 60 22 C58 32 50 38 40 38 C34 38 30 36 26 32 C22 40 12 44 6 42 C12 40 16 36 16 32 C12 34 8 33 6 30 Z" />
  ),
};

const rimStyles: Record<GraphicIcon, string> = {
  bolt: "text-rust-light",
  skull: "text-cream",
  star: "text-rust-light",
  wings: "text-cream",
  moon: "text-cream-dim",
  serpent: "text-rust-light",
  cross: "text-cream",
  flame: "text-rust-light",
  dove: "text-cream-dim",
};

interface TeeArtProps {
  band: string;
  tourYear: string;
  graphic: GraphicIcon;
  className?: string;
  compact?: boolean;
}

export function TeeArt({
  band,
  tourYear,
  graphic,
  className = "",
  compact = false,
}: TeeArtProps) {
  const Icon = icons[graphic];

  return (
    <div
      className={`torn-edge relative flex flex-col items-center justify-center overflow-hidden bg-ink-soft border border-ink-line ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 30%, rgba(181,80,46,0.16), transparent 60%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <svg
        viewBox="0 0 64 64"
        className={`${rimStyles[graphic]} ${
          compact ? "w-14 h-14" : "w-24 h-24 md:w-28 md:h-28"
        } fill-current stroke-current`}
        strokeWidth={2}
      >
        <Icon />
      </svg>
      {!compact && (
        <div className="mt-4 text-center px-4">
          <p className="font-display uppercase tracking-wide text-cream text-lg leading-none">
            {band}
          </p>
          <p className="font-condensed text-cream-dim text-xs tracking-[0.3em] mt-1">
            EST. {tourYear}
          </p>
        </div>
      )}
      <div className="absolute inset-0 border border-cream/5 pointer-events-none" />
    </div>
  );
}
