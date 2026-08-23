import { InvestmentScenario, RentalScenario, ForumPost } from "@/types";

/**
 * -----------------------------------------------------------------------
 * STORAGE LAYER — mock version
 * -----------------------------------------------------------------------
 * Everything here reads/writes browser localStorage so the app is fully
 * functional with zero backend setup. Every function is written as if it
 * already talks to a real database, so swapping the implementation later
 * (e.g. for PostgreSQL via Prisma, or Firebase Firestore) means changing
 * the *inside* of these functions only — nothing that calls them needs to
 * change.
 *
 *   TODO(real-db): replace the localStorage calls below with e.g.
 *     const res = await fetch("/api/scenarios/investment");
 *     return res.json();
 *   backed by a Next.js API route (see app/api/.../route.ts stubs) that
 *   reads/writes Postgres or Firestore.
 * -----------------------------------------------------------------------
 */

const KEYS = {
  investment: "finlearn:investment-scenarios",
  rental: "finlearn:rental-scenarios",
  forum: "finlearn:forum-posts",
};

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can fail (quota, private browsing, etc). Non-fatal for a mock layer.
  }
}

export function getInvestmentScenarios(): InvestmentScenario[] {
  return safeGet(KEYS.investment, []);
}

export function saveInvestmentScenario(scenario: InvestmentScenario): void {
  const existing = getInvestmentScenarios();
  safeSet(KEYS.investment, [scenario, ...existing]);
}

export function deleteInvestmentScenario(id: string): void {
  safeSet(
    KEYS.investment,
    getInvestmentScenarios().filter((s) => s.id !== id)
  );
}

export function getRentalScenarios(): RentalScenario[] {
  return safeGet(KEYS.rental, []);
}

export function saveRentalScenario(scenario: RentalScenario): void {
  const existing = getRentalScenarios();
  safeSet(KEYS.rental, [scenario, ...existing]);
}

export function deleteRentalScenario(id: string): void {
  safeSet(
    KEYS.rental,
    getRentalScenarios().filter((s) => s.id !== id)
  );
}

export type ForumStore = Record<string, ForumPost[]>;

export function getForumStore(seed: ForumStore): ForumStore {
  return safeGet(KEYS.forum, seed);
}

export function saveForumStore(store: ForumStore): void {
  safeSet(KEYS.forum, store);
}
