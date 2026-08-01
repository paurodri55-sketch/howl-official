"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/client";

const LOCALE_FLAG: Record<Locale, string> = {
  es: "🇪🇸",
  en: "🇬🇧",
};

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  function switchTo(locale: Locale) {
    const rest = pathname.split("/").slice(2).join("/");
    const nextPath = `/${locale}${rest ? `/${rest}` : ""}`;
    document.cookie = `locale=${locale}; path=/; max-age=31536000`;
    router.push(nextPath);
  }

  return (
    <div className="flex items-center gap-1">
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => switchTo(locale)}
          aria-label={locale === "en" ? "Switch to English" : "Cambiar a Español"}
          aria-current={currentLocale === locale}
          className={`flex h-7 w-7 items-center justify-center rounded-full text-base transition-opacity ${
            currentLocale === locale ? "opacity-100 ring-1 ring-rust-light" : "opacity-50 hover:opacity-80"
          }`}
        >
          {LOCALE_FLAG[locale]}
        </button>
      ))}
    </div>
  );
}
