import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 font-condensed uppercase tracking-widest text-sm px-6 py-3 transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  solid: "bg-rust text-cream hover:bg-rust-light",
  outline:
    "border border-cream/40 text-cream hover:border-rust hover:text-rust-light",
  ghost: "text-cream-dim hover:text-cream",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({
  variant = "solid",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface LinkButtonProps {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

export function LinkButton({
  href,
  variant = "solid",
  className = "",
  children,
}: LinkButtonProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
