import type { ReactElement } from "react";
import type { GraphicIcon } from "@/lib/types";

export const graphicIcons: Record<GraphicIcon, () => ReactElement> = {
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
  landscape: () => (
    <g>
      <circle cx="46" cy="16" r="8" />
      <path d="M2 48 L20 26 L32 40 L42 28 L62 48 Z" />
    </g>
  ),
  scorpion: () => (
    <g>
      <ellipse cx="30" cy="42" rx="15" ry="10" />
      <circle cx="42" cy="34" r="6" />
      <circle cx="48" cy="24" r="5.5" />
      <circle cx="49" cy="14" r="5" />
      <circle cx="44" cy="6" r="4.5" />
      <path d="M44 6 L36 2 L40 10 Z" />
      <path d="M18 34 C10 30 4 32 8 40 C12 38 16 38 20 40 Z" />
      <path d="M18 50 C10 54 4 52 8 44 C12 46 16 46 20 44 Z" />
    </g>
  ),
};

export function GraphicIconSvg({
  graphic,
  className = "",
  ink,
}: {
  graphic: GraphicIcon;
  className?: string;
  ink?: string;
}) {
  const Icon = graphicIcons[graphic];
  return (
    <svg
      viewBox="0 0 64 64"
      className={`fill-current stroke-current ${className}`}
      strokeWidth={2}
      style={ink ? { color: ink } : undefined}
    >
      <Icon />
    </svg>
  );
}
