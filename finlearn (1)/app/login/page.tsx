"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/mockAuth";

export default function LoginPage() {
  const { login, user, logout } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return (
      <div className="mx-auto max-w-sm px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-bold text-ink">You're logged in as {user.username}</h1>
        <p className="mt-2 text-sm text-ink/60">This is a mock session for demo purposes only.</p>
        <button
          onClick={logout}
          className="mt-6 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:border-brand"
        >
          Log out
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    // TODO(real-auth): verify credentials against a real provider here instead.
    login(username.trim());
    router.push("/community");
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="font-display text-2xl font-bold text-ink">Log in</h1>
      <p className="mt-2 text-sm text-ink/60">
        This is a mock login — any username/password combo works. No account is actually created.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink/70">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink/70">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-paper hover:bg-brand-dark"
        >
          Log in
        </button>
      </form>
      <p className="mt-4 text-sm text-ink/60">
        No account?{" "}
        <Link href="/signup" className="font-semibold text-link">
          Sign up
        </Link>{" "}
        — or just{" "}
        <Link href="/community" className="font-semibold text-link">
          browse as a guest
        </Link>
        .
      </p>
    </div>
  );
}
