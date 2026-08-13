"use client";

import { useId, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getFaq, matchFaq } from "@/lib/faq";

interface ChatEntry {
  role: "bot" | "user";
  text: string;
}

export function FaqBot({
  locale,
  liftedForCookieBanner = false,
}: {
  locale: Locale;
  liftedForCookieBanner?: boolean;
}) {
  const t = getDictionary(locale).faqBot;
  const faq = getFaq(locale);
  const panelId = useId();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<ChatEntry[]>([
    { role: "bot", text: t.greeting },
  ]);

  function ask(question: string) {
    const match = matchFaq(locale, question);
    setHistory((h) => [
      ...h,
      { role: "user", text: question },
      { role: "bot", text: match ? match.answer : t.fallback },
    ]);
    setInput("");
  }

  return (
    <div
      className={`fixed right-4 sm:right-6 z-40 flex flex-col items-end transition-[bottom] ${
        liftedForCookieBanner ? "bottom-48 sm:bottom-28" : "bottom-24 sm:bottom-6"
      }`}
    >
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label={t.title}
          className="mb-3 w-[calc(100vw-2rem)] max-w-sm border border-ink-line bg-ink-soft flex flex-col max-h-[70vh]"
        >
          <div className="flex items-center justify-between border-b border-ink-line px-4 py-3">
            <p className="font-condensed uppercase tracking-[0.3em] text-xs text-rust-light">
              {t.title}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="text-cream-dim hover:text-cream text-lg leading-none"
            >
              ✕
            </button>
          </div>

          <div
            className="flex-1 overflow-y-auto px-4 py-3 space-y-2"
            aria-live="polite"
          >
            {history.map((entry, i) => (
              <div
                key={i}
                className={`text-sm leading-snug ${
                  entry.role === "user"
                    ? "text-cream text-right"
                    : "text-cream-dim text-left"
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 max-w-[85%] ${
                    entry.role === "user"
                      ? "bg-rust/20 text-cream"
                      : "bg-ink border border-ink-line"
                  }`}
                >
                  {entry.text}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-ink-line px-3 py-2 flex flex-wrap gap-2">
            {faq.slice(0, 4).map((entry) => (
              <button
                key={entry.question}
                type="button"
                onClick={() => ask(entry.question)}
                className="text-xs border border-ink-line px-2 py-1 text-cream-dim hover:text-cream hover:border-rust-light"
              >
                {entry.question}
              </button>
            ))}
          </div>

          <form
            className="border-t border-ink-line p-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) ask(input.trim());
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 bg-ink border border-ink-line px-3 py-2 text-sm text-cream placeholder:text-cream-dim/60 focus:outline-none focus:border-rust-light"
            />
            <button
              type="submit"
              className="bg-rust px-3 py-2 text-sm uppercase tracking-wide text-cream hover:bg-rust-light"
            >
              {t.send}
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t.close : t.open}
        className="h-12 w-12 rounded-full bg-rust text-cream flex items-center justify-center shadow-lg hover:bg-rust-light"
      >
        {open ? "✕" : "?"}
      </button>
    </div>
  );
}
