"use client";

import { useState, type FormEvent } from "react";

type Variant = "section" | "footer" | "modal";

const ctaLabel: Record<Variant, string> = {
  section: "Acceso anticipado",
  footer: "Entrar",
  modal: "Quiero acceso anticipado",
};

export function NewsletterForm({
  variant = "section",
  source,
}: {
  variant?: Variant;
  source: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = (await res.json()) as { success: boolean };
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p
        className={
          variant === "footer"
            ? "text-sm text-rust-light"
            : "font-condensed text-cream"
        }
      >
        Estás dentro — serás de los primeros en enterarte.
      </p>
    );
  }

  const isFooter = variant === "footer";

  return (
    <form
      onSubmit={handleSubmit}
      className={
        isFooter
          ? "flex gap-2"
          : "flex flex-col sm:flex-row gap-3 w-full max-w-md"
      }
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        className={`min-w-0 flex-1 bg-transparent border px-4 py-2.5 text-sm text-cream placeholder:text-cream-dim/50 focus:outline-none focus:border-rust ${
          isFooter ? "border-cream/20" : "border-cream/30"
        }`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="shrink-0 bg-rust text-cream hover:bg-rust-light font-condensed uppercase tracking-widest text-sm px-5 py-2.5 transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "..." : ctaLabel[variant]}
      </button>
      {status === "error" && (
        <p className="text-xs text-rust-light w-full">
          Algo falló, prueba otra vez.
        </p>
      )}
    </form>
  );
}
