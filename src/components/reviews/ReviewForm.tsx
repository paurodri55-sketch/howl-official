"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ReviewForm({ token, productName }: { token: string; productName: string }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [authorLabel, setAuthorLabel] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating < 1) {
      setError("Elige una valoración de 1 a 5 estrellas");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, rating, text, authorLabel }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "No se pudo enviar la reseña");
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setError("Error de red, inténtalo de nuevo");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="text-cream-dim">
        Gracias por tu reseña de <span className="text-cream">{productName}</span>. La
        publicaremos en cuanto la revisemos.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-3">
          Tu valoración
        </p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              onMouseEnter={() => setHoverRating(n)}
              onMouseLeave={() => setHoverRating(0)}
              className={`text-3xl leading-none ${
                n <= (hoverRating || rating) ? "text-rust-light" : "text-cream/20"
              }`}
              aria-label={`${n} estrellas`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-2 block">
          Tu reseña
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={1000}
          rows={5}
          required
          className="w-full bg-ink-soft border border-ink-line px-4 py-3 text-cream placeholder:text-cream-dim/50 focus:outline-none focus:border-rust"
          placeholder={`¿Qué te ha parecido ${productName}?`}
        />
      </div>

      <div>
        <label className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-2 block">
          Tu nombre (opcional, se mostrará junto a la reseña)
        </label>
        <input
          type="text"
          value={authorLabel}
          onChange={(e) => setAuthorLabel(e.target.value)}
          maxLength={60}
          className="w-full bg-ink-soft border border-ink-line px-4 py-3 text-cream placeholder:text-cream-dim/50 focus:outline-none focus:border-rust"
          placeholder="Cliente verificado"
        />
      </div>

      {error && <p className="text-rust-light text-sm">{error}</p>}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Enviando..." : "Enviar reseña"}
      </Button>
    </form>
  );
}
