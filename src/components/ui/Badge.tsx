import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block border border-rust text-rust-light font-condensed uppercase tracking-widest text-xs px-2 py-1">
      {children}
    </span>
  );
}
