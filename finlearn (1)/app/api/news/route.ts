import { NextResponse } from "next/server";
import { MOCK_ARTICLES } from "@/lib/mockNews";

/**
 * Placeholder API route. Today it just serves the mock array so the shape
 * matches what a real integration would return.
 *
 * TODO(real-news-api): fetch from a real provider (NewsAPI, GNews, etc.),
 * map the response into NewsArticle[], and optionally cache it (e.g. with
 * Next.js's fetch cache or a cron-refreshed table in Postgres) instead of
 * calling the provider on every request.
 */
export async function GET() {
  return NextResponse.json({ articles: MOCK_ARTICLES });
}
