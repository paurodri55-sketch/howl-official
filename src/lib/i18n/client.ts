"use client";

import { usePathname } from "next/navigation";
import { locales, defaultLocale, type Locale } from "./config";

export function useLocale(): Locale {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];
  return (locales as readonly string[]).includes(segment) ? (segment as Locale) : defaultLocale;
}

export { withLocale } from "./config";
