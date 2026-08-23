"use client";

import { useState } from "react";
import { NewsArticle } from "@/types";
import { toPlainEnglish } from "@/lib/mockNews";

const CATEGORY_STYLES: Record<string, string> = {
  markets: "bg-link-light text-link",
  housing: "bg-accent-light text-accent-dark",
  inflation: "bg-brand-light text-brand-dark",
  jobs: "bg-line text-ink/70",
  policy: "bg-[#F6E4E0] text-danger",
};

export function ArticleCard({ article }: { article: NewsArticle }) {
  const [plain, setPlain] = useState(true);

  return (
    <article className="rounded-xl2 border border-line bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className={`rounded-full px-2.5 py-1 font-semibold capitalize ${CATEGORY_STYLES[article.category]}`}>
          {article.category}
        </span>
        <time className="text-ink/50" dateTime={article.date}>
          {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </time>
        <span className="text-ink/40">· {article.source}</span>
      </div>

      <h3 className="mt-3 font-display text-lg font-bold text-ink">{article.title}</h3>

      <p className="mt-2 text-sm leading-relaxed text-ink/80">
        {plain ? toPlainEnglish(article) : article.summary}
      </p>

      <button
        onClick={() => setPlain((p) => !p)}
        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
      >
        {plain ? "Show original wording" : "Show Plain English"}
      </button>
    </article>
  );
}
