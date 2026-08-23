"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/mockAuth";

const LINKS = [
  { href: "/news", label: "News" },
  { href: "/tools/investment", label: "Investment Tools" },
  { href: "/tools/rental", label: "Rental Tools" },
  { href: "/compare", label: "Comparison" },
  { href: "/community", label: "Community" },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-ink">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-paper">$</span>
          FinLearn
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-ink/80 hover:text-brand">
              {l.label}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/community" className="text-sm font-semibold text-brand">
                Hey, {user.username}
              </Link>
              <button
                onClick={logout}
                className="rounded-full border border-line px-3 py-1.5 text-sm font-medium text-ink/70 hover:border-brand hover:text-brand"
              >
                Log out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-ink px-4 py-1.5 text-sm font-semibold text-paper hover:bg-brand"
            >
              Login / Profile
            </Link>
          )}
        </nav>

        <button
          className="md:hidden rounded-lg border border-line p-2"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-5 bg-ink mb-1" />
          <span className="block h-0.5 w-5 bg-ink mb-1" />
          <span className="block h-0.5 w-5 bg-ink" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line px-4 py-3 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink/80 hover:bg-brand-light"
            >
              {l.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="rounded-lg px-3 py-2 text-left text-sm font-medium text-ink/80 hover:bg-brand-light"
            >
              Log out ({user.username})
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-brand hover:bg-brand-light"
            >
              Login / Profile
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
