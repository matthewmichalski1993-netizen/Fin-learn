"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { MockUser } from "@/types";

/**
 * -----------------------------------------------------------------------
 * AUTH LAYER — mock version
 * -----------------------------------------------------------------------
 * This is intentionally NOT real authentication. There is no password
 * hashing, no server-side session, no verification of any kind — signing
 * up just remembers a username in localStorage so the rest of the app has
 * something to display ("Guest" vs a username on forum posts, a Profile
 * link in the nav, etc).
 *
 *   TODO(real-auth): swap this provider for a real identity provider, e.g.
 *     - Firebase Auth: onAuthStateChanged(), signInWithEmailAndPassword()
 *     - Auth0: useUser() / withPageAuthRequired()
 *     - NextAuth.js: useSession(), signIn(), signOut()
 *   The `useAuth()` hook below is the seam: keep its return shape
 *   ({ user, login, signup, logout }) the same and nothing else in the
 *   app needs to change.
 * -----------------------------------------------------------------------
 */

interface AuthContextValue {
  user: MockUser | null;
  login: (username: string) => void;
  signup: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "finlearn:mock-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const persist = (u: MockUser | null) => {
    setUser(u);
    try {
      if (u) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const value: AuthContextValue = {
    user,
    login: (username: string) => persist({ username }),
    signup: (username: string) => persist({ username }),
    logout: () => persist(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
