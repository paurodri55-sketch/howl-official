"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const CONSENT_COOKIE = "howl_cookie_consent";

export function CookieConsentBanner({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).cookieBanner;
  const router = useRouter();
  const [dismissed, setDismissed] = useState(false);

  const setConsent = useCallback(
    (value: "accepted" | "rejected") => {
      document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=31536000`;
      setDismissed(true);
      router.refresh();
    },
    [router]
  );

  if (dismissed) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-line bg-ink/98 backdrop-blur px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-cream-dim leading-relaxed sm:max-w-2xl">
          {t.message}{" "}
          <Link
            href={withLocale("/legal/cookies", locale)}
            className="underline hover:text-cream"
          >
            {t.learnMore}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => setConsent("rejected")}
            className="font-condensed uppercase tracking-widest text-xs px-3.5 py-2 border border-cream/30 text-cream-dim hover:border-cream"
          >
            {t.reject}
          </button>
          <button
            type="button"
            onClick={() => setConsent("accepted")}
            className="font-condensed uppercase tracking-widest text-xs px-3.5 py-2 border border-rust bg-rust text-cream"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
