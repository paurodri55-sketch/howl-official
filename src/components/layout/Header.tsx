"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useLocale, withLocale } from "@/lib/i18n/client";
import { getDictionary } from "@/lib/i18n/dictionaries";

export function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const { itemCount } = useCart();
  const t = getDictionary(locale).header;

  const navLinks = [
    { href: "/", label: t.home },
    { href: "/catalogo", label: t.catalog },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-ink-line bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href={withLocale("/", locale)}
          className="flex items-center gap-2 font-display text-2xl sm:text-3xl tracking-wide text-cream"
        >
          <Logo className="h-10 w-auto sm:h-12" />
          HOWL
        </Link>

        <nav className="flex items-center gap-3 sm:gap-6 font-condensed uppercase tracking-widest text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={withLocale(link.href, locale)}
              className={`transition-colors ${link.href === "/" ? "hidden sm:inline" : ""} ${
                pathname === withLocale(link.href, locale)
                  ? "text-rust-light"
                  : "text-cream-dim hover:text-cream"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <Link
            href={withLocale("/carrito", locale)}
            className="relative flex items-center text-cream-dim hover:text-cream transition-colors"
            aria-label={t.cartAria}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-none stroke-current"
              strokeWidth={1.8}
            >
              <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-rust text-[10px] text-cream">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
