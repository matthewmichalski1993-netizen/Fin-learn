"use client";

import { useMemo, useState } from "react";
import { getNews } from "@/lib/mockNews";
import { ArticleCard } from "@/components/ArticleCard";
import { NewsCategory } from "@/types";

const CATEGORIES: (NewsCategory | "all")[] = ["all", "markets", "housing", "inflation", "jobs", "policy"];

export default function NewsPage() {
  const [category, setCategory] = useState<NewsCategory | "all">("all");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const articles = useMemo(() => {
    let list = getNews();
    if (category !== "all") list = list.filter((a) => a.category === category);
    list = [...list].sort((a, b) =>
      sort === "newest" ? +new Date(b.date) - +new Date(a.date) : +new Date(a.date) - +new Date(b.date)
    );
    return list;
  }, [category, sort]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-ink">Current Events</h1>
      <p className="mt-2 text-ink/60">
        Real economic topics, rewritten in plain English. Toggle any card back to the original wording.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                category === c
                  ? "border-brand bg-brand text-paper"
                  : "border-line bg-white text-ink/70 hover:border-brand"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <label className="ml-auto flex items-center gap-2 text-sm text-ink/70">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
            className="rounded-lg border border-line bg-white px-2 py-1.5"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-4">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
        {articles.length === 0 && <p className="text-ink/60">No stories in this category yet.</p>}
      </div>
    </div>
  );
}
