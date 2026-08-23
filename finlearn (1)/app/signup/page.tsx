"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/mockAuth";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    // TODO(real-auth): create a real account via Firebase Auth / Auth0 / NextAuth here instead.
    signup(username.trim());
    router.push("/community");
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="font-display text-2xl font-bold text-ink">Create an account</h1>
      <p className="mt-2 text-sm text-ink/60">
        Optional — you can always post as a guest instead. This mock signup doesn't send your
        info anywhere.
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
          <label className="block text-sm font-medium text-ink/70">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-paper hover:bg-brand-dark"
        >
          Sign up
        </button>
      </form>
      <p className="mt-4 text-sm text-ink/60">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-link">
          Log in
        </Link>
      </p>
    </div>
  );
}
