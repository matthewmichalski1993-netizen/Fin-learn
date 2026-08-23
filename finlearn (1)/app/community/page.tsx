"use client";

import { useEffect, useState } from "react";
import { FORUM_TOPICS, SEED_POSTS } from "@/lib/forumData";
import { getForumStore, saveForumStore, ForumStore } from "@/lib/storage";
import { ForumPost } from "@/types";
import { useAuth } from "@/lib/mockAuth";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - +new Date(iso);
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function CommunityPage() {
  const { user } = useAuth();
  const [store, setStore] = useState<ForumStore>({});
  const [activeTopic, setActiveTopic] = useState(FORUM_TOPICS[0].id);
  const [draft, setDraft] = useState("");
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [postAnonymously, setPostAnonymously] = useState(!user);

  useEffect(() => {
    setStore(getForumStore(SEED_POSTS));
  }, []);

  const persist = (next: ForumStore) => {
    setStore(next);
    saveForumStore(next);
  };

  const posts = store[activeTopic] || [];

  const handlePost = () => {
    if (!draft.trim()) return;
    const newPost: ForumPost = {
      id: `p-${Date.now()}`,
      author: postAnonymously || !user ? "Guest" : user.username,
      timestamp: new Date().toISOString(),
      content: draft.trim(),
      replies: [],
    };
    persist({ ...store, [activeTopic]: [newPost, ...posts] });
    setDraft("");
  };

  const handleReply = (postId: string) => {
    const content = (replyDrafts[postId] || "").trim();
    if (!content) return;
    const updated = posts.map((p) =>
      p.id === postId
        ? {
            ...p,
            replies: [
              ...p.replies,
              {
                id: `r-${Date.now()}`,
                author: postAnonymously || !user ? "Guest" : user.username,
                timestamp: new Date().toISOString(),
                content,
              },
            ],
          }
        : p
    );
    persist({ ...store, [activeTopic]: updated });
    setReplyDrafts((d) => ({ ...d, [postId]: "" }));
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-ink">Community Discussion</h1>
      <p className="mt-2 max-w-2xl text-ink/60">
        Post as a guest or under a username — either way, keep it kind. Posts here are stored on
        your own browser for this demo, so they're visible only to you right now.
      </p>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {FORUM_TOPICS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTopic(t.id)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              activeTopic === t.id ? "border-brand bg-brand text-paper" : "border-line bg-white text-ink/70"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>
      <p className="mt-2 text-sm text-ink/50">{FORUM_TOPICS.find((t) => t.id === activeTopic)?.description}</p>

      <div className="mt-6 rounded-xl2 border border-line bg-white p-4 shadow-soft">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="What's on your mind?"
          rows={3}
          className="w-full resize-none rounded-lg border border-line p-3 text-sm outline-none focus:border-brand"
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm text-ink/60">
            <input
              type="checkbox"
              checked={postAnonymously || !user}
              disabled={!user}
              onChange={(e) => setPostAnonymously(e.target.checked)}
            />
            Post as Guest {user && `(otherwise posts as ${user.username})`}
          </label>
          <button
            onClick={handlePost}
            className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-paper hover:bg-brand-dark"
          >
            Post
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {posts.length === 0 && <p className="text-ink/50">No posts yet in this topic — be the first.</p>}
        {posts.map((p) => (
          <div key={p.id} className="rounded-xl2 border border-line bg-white p-4 shadow-soft">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-ink">{p.author}</span>
              <span className="text-ink/40">· {timeAgo(p.timestamp)}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">{p.content}</p>

            {p.replies.length > 0 && (
              <div className="mt-3 space-y-2 border-l-2 border-line pl-4">
                {p.replies.map((r) => (
                  <div key={r.id} className="text-sm">
                    <span className="font-semibold text-ink">{r.author}</span>
                    <span className="ml-2 text-ink/40">{timeAgo(r.timestamp)}</span>
                    <p className="text-ink/70">{r.content}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3 flex gap-2">
              <input
                value={replyDrafts[p.id] || ""}
                onChange={(e) => setReplyDrafts((d) => ({ ...d, [p.id]: e.target.value }))}
                placeholder="Reply..."
                className="flex-1 rounded-lg border border-line px-3 py-1.5 text-sm outline-none focus:border-brand"
              />
              <button
                onClick={() => handleReply(p.id)}
                className="rounded-full border border-line px-4 py-1.5 text-sm font-medium text-ink/70 hover:border-brand hover:text-brand"
              >
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
