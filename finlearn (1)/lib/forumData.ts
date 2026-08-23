import { ForumTopic, ForumPost } from "@/types";

export const FORUM_TOPICS: ForumTopic[] = [
  { id: "investing", name: "Investing", description: "Index funds, brokerage accounts, first-time investor questions." },
  { id: "rentals", name: "Rentals", description: "Landlording, property math, tenant stories." },
  { id: "news-reactions", name: "News Reactions", description: "React to what's happening in the economy this week." },
  { id: "side-hustles", name: "Side Hustles", description: "Extra income ideas and how they're actually going." },
];

export const SEED_POSTS: Record<string, ForumPost[]> = {
  investing: [
    {
      id: "p1",
      author: "quietcompounder",
      timestamp: "2026-08-19T14:22:00.000Z",
      content:
        "Put my first $500 into an index fund this week. Is it normal to feel weirdly nervous about something that's supposed to be 'boring and safe'?",
      replies: [
        {
          id: "r1",
          author: "Guest",
          timestamp: "2026-08-19T15:01:00.000Z",
          content: "100% normal. The boring part comes after year two or three, I promise.",
        },
      ],
    },
  ],
  rentals: [
    {
      id: "p2",
      author: "Guest",
      timestamp: "2026-08-17T09:10:00.000Z",
      content:
        "Ran the numbers on a duplex and cash flow is only about $80/month after everything. Worth it for a first property or keep looking?",
      replies: [],
    },
  ],
  "news-reactions": [
    {
      id: "p3",
      author: "marigoldmegan",
      timestamp: "2026-08-20T18:45:00.000Z",
      content: "Fed holding rates again — anyone else just tired of waiting for mortgage rates to move?",
      replies: [],
    },
  ],
  "side-hustles": [
    {
      id: "p4",
      author: "Guest",
      timestamp: "2026-08-15T11:00:00.000Z",
      content: "Started tutoring on weekends, made an extra $300 last month. Small but it adds up.",
      replies: [],
    },
  ],
};
