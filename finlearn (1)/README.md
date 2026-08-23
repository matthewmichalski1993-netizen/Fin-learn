# FinLearn

A casual, mobile-first site for 18–39 year-olds who want simple money tools, plain-English
economic news, and a place to talk about it. Built with **Next.js (App Router) + TypeScript +
Tailwind CSS**.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## What's here

| Route | Page |
|---|---|
| `/` | Home — hero, quick links, Beginner's Corner |
| `/news` | Current Events — mock articles with a Plain English toggle, category filter, date sort |
| `/tools/investment` | Investment Calculator — compound growth chart, save scenario |
| `/tools/rental` | Rental Income Calculator — cash flow / cash-on-cash, income vs. expense chart |
| `/compare` | Comparison Tool — pulls saved scenarios from both calculators side by side |
| `/community` | Forum — topics, guest or username posting, replies |
| `/login`, `/signup` | Mock auth |

## Architecture & where to plug in real infrastructure

Everything is written so the mock version and the "real" version share the same shape — swap the
inside of a function, not the code that calls it.

- **News** — `lib/mockNews.ts` exports `getNews()` and `toPlainEnglish()`. `getNews()` currently
  returns a hard-coded array; the `TODO(real-news-api)` comment shows where to fetch from a real
  provider instead. `toPlainEnglish()` is a small rule-based word swap — a natural place to call
  an LLM ("rewrite this for a 10th grader") once one is wired up. There's also a stub API route at
  `app/api/news/route.ts`.

- **Scenarios (calculators) & forum posts** — `lib/storage.ts` reads/writes `localStorage` today.
  Every `TODO(real-db)` comment there marks where a `fetch("/api/...")` call to a real database
  (PostgreSQL via Prisma, or Firebase Firestore) would go instead. A stub route lives at
  `app/api/scenarios/route.ts`.

- **Auth** — `lib/mockAuth.tsx` is a React context that stores a username in `localStorage` with
  zero verification. `TODO(real-auth)` marks the swap point for Firebase Auth, Auth0, or
  NextAuth.js — keep the `useAuth()` hook's return shape (`user`, `login`, `signup`, `logout`) the
  same and no page needs to change.

- **Design tokens** — `tailwind.config.ts` centralizes the palette, fonts, radii, and shadow so a
  future "more professional fintech" redesign is mostly a config edit, not a rewrite. Fonts:
  Space Grotesk (headlines), Inter (body), IBM Plex Mono (numbers).

## Known simplifications (intentional, for a v1)

- Rental cash-on-cash return uses down payment only as cash invested (no closing costs yet).
- The investment calculator assumes a constant monthly return — real markets are not this smooth.
- Forum and scenario data live in the browser's `localStorage`, so they're per-device, not
  shared across users or devices until a real backend is connected.
