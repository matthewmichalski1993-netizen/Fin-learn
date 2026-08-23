import { NewsArticle } from "@/types";

/**
 * -----------------------------------------------------------------------
 * NEWS LAYER — mock version
 * -----------------------------------------------------------------------
 *   TODO(real-news-api): replace getNews() with a real fetch, e.g.
 *     const res = await fetch(
 *       `https://newsapi.org/v2/everything?q=economy&apiKey=${process.env.NEWS_API_KEY}`
 *     );
 *     const raw = await res.json();
 *     return raw.articles.map(mapExternalArticleToNewsArticle);
 *   Keep the NewsArticle shape the same and every page that renders news
 *   keeps working unchanged. Run the plain-English rewrite (below) over
 *   each incoming article's summary the same way it runs over mock data.
 * -----------------------------------------------------------------------
 */

export const MOCK_ARTICLES: NewsArticle[] = [
  {
    id: "n1",
    title: "The Fed holds interest rates steady again",
    date: "2026-08-20",
    category: "policy",
    summary:
      "The Federal Reserve kept its benchmark interest rate unchanged for a third consecutive meeting, citing balanced risks between inflation and employment.",
    plainEnglish:
      "The country's central bank decided not to change the 'base interest rate' — the rate that influences most loans and credit cards — for the third meeting in a row. They're waiting to see more data before making a move either way.",
    source: "Mock Wire",
  },
  {
    id: "n2",
    title: "Home prices cool slightly as mortgage rates stay high",
    date: "2026-08-19",
    category: "housing",
    summary:
      "National home price growth slowed for the second straight month as elevated mortgage rates continue to price out first-time buyers.",
    plainEnglish:
      "Houses are getting a little cheaper (or at least not getting pricier as fast), because loans to buy a house still cost a lot in interest, so fewer people can afford to buy right now.",
    source: "Mock Wire",
  },
  {
    id: "n3",
    title: "Inflation ticks down to 2.8% annually",
    date: "2026-08-18",
    category: "inflation",
    summary:
      "Consumer prices rose 2.8% year-over-year in July, down from 3.1% the previous month, driven largely by falling energy costs.",
    plainEnglish:
      "Prices for everyday stuff are still going up, just a little more slowly than last month — mostly because gas and energy got cheaper.",
    source: "Mock Wire",
  },
  {
    id: "n4",
    title: "Job growth beats expectations in July",
    date: "2026-08-15",
    category: "jobs",
    summary:
      "Employers added 215,000 jobs last month, topping forecasts, while the unemployment rate held steady at 4.0%.",
    plainEnglish:
      "More people got hired last month than experts predicted, and the share of people looking for work but not finding it stayed about the same.",
    source: "Mock Wire",
  },
  {
    id: "n5",
    title: "Stock indexes hit a new high on tech earnings",
    date: "2026-08-14",
    category: "markets",
    summary:
      "Major indexes closed at record levels after several large technology companies reported quarterly earnings above analyst estimates.",
    plainEnglish:
      "The stock market went up to its highest point ever, mostly because a few big tech companies made more money last quarter than experts expected.",
    source: "Mock Wire",
  },
  {
    id: "n6",
    title: "Congress debates new tax credit for first-time buyers",
    date: "2026-08-12",
    category: "policy",
    summary:
      "Lawmakers are considering a proposal that would offer a refundable tax credit to households purchasing their first home.",
    plainEnglish:
      "The government might start giving money back on your taxes if you're buying your very first house, to make it a little easier to afford.",
    source: "Mock Wire",
  },
  {
    id: "n7",
    title: "Rental vacancy rate rises in several big cities",
    date: "2026-08-10",
    category: "housing",
    summary:
      "Rental vacancy rates increased in multiple metro areas as new apartment supply outpaced demand growth.",
    plainEnglish:
      "More apartments are sitting empty in some big cities right now, because builders put up a lot of new buildings faster than new renters showed up.",
    source: "Mock Wire",
  },
  {
    id: "n8",
    title: "Small business optimism ticks higher",
    date: "2026-08-08",
    category: "markets",
    summary:
      "A closely watched index of small-business sentiment rose for the second month, with owners citing easing supply costs.",
    plainEnglish:
      "Small business owners are feeling a bit more hopeful lately, mostly because the stuff they need to buy to run their business is getting a little cheaper.",
    source: "Mock Wire",
  },
];

export function getNews(): NewsArticle[] {
  // Swap for an async network call when wiring up a real news API — see TODO above.
  return MOCK_ARTICLES;
}

/**
 * A very small rule-based simplifier. It is not a real NLP model — it swaps
 * a short list of jargon terms for plainer words/phrases. It's here mostly
 * so the architecture has a clear seam: swap the body of this function for
 * a call to an LLM ("rewrite this for a 10th grader") once one is wired up,
 * and every caller keeps working unchanged.
 */
const JARGON_MAP: Record<string, string> = {
  "benchmark interest rate": "base interest rate",
  "year-over-year": "compared to a year ago",
  "consumer prices": "prices for everyday stuff",
  unemployment: "people looking for work but not finding it",
  "refundable tax credit": "money back on your taxes",
  "vacancy rate": "share of empty units",
  sentiment: "how people feel",
  earnings: "profit",
  indexes: "the stock market",
};

export function toPlainEnglish(article: NewsArticle): string {
  // If we already have a hand-written plain-English version, prefer it —
  // it reads better than the mechanical swap below.
  if (article.plainEnglish) return article.plainEnglish;

  let text = article.summary;
  for (const [jargon, plain] of Object.entries(JARGON_MAP)) {
    const re = new RegExp(jargon, "gi");
    text = text.replace(re, plain);
  }
  return text;
}
