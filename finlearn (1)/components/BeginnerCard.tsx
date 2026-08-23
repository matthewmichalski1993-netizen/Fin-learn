"use client";

import { useState } from "react";

export function BeginnerCard({ title, teaser, explainer }: { title: string; teaser: string; explainer: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      className="sticky-tilt rounded-xl2 border border-line bg-white p-5 text-left shadow-soft transition-transform hover:shadow-lg"
      aria-pressed={flipped}
    >
      <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink/70">{flipped ? explainer : teaser}</p>
      <span className="mt-3 inline-block text-xs font-semibold text-brand">
        {flipped ? "Tap to collapse" : "Tap to learn more →"}
      </span>
    </button>
  );
}
