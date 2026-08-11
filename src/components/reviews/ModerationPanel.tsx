"use client";

import { useState } from "react";
import type { Review } from "@/lib/reviews";
import { Button } from "@/components/ui/Button";

export function ModerationPanel({
  initialPending,
  adminKey,
}: {
  initialPending: Review[];
  adminKey: string;
}) {
  const [pending, setPending] = useState(initialPending);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function moderate(id: string, approve: boolean) {
    setBusyId(id);
    await fetch(`/api/admin/reviews?key=${encodeURIComponent(adminKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approve }),
    });
    setPending((prev) => prev.filter((r) => r.id !== id));
    setBusyId(null);
  }

  if (pending.length === 0) {
    return <p className="text-cream-dim">No hay reseñas pendientes de moderación.</p>;
  }

  return (
    <div className="space-y-6">
      {pending.map((review) => (
        <div key={review.id} className="border border-ink-line bg-ink-soft p-6">
          <p className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-1">
            {review.slug} · {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)} · {review.authorLabel}
          </p>
          <p className="text-cream mb-4">{review.text}</p>
          <div className="flex gap-3">
            <Button
              variant="solid"
              disabled={busyId === review.id}
              onClick={() => moderate(review.id, true)}
            >
              Aprobar
            </Button>
            <Button
              variant="outline"
              disabled={busyId === review.id}
              onClick={() => moderate(review.id, false)}
            >
              Rechazar
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
