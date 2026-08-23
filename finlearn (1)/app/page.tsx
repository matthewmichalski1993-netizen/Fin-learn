import Link from "next/link";
import { Squiggle } from "@/components/Squiggle";
import { BeginnerCard } from "@/components/BeginnerCard";

const QUICK_LINKS = [
  { href: "/news", title: "Current Events", desc: "Economic news, rewritten so it actually makes sense." },
  { href: "/tools/investment", title: "Investment Calculator", desc: "See what your money could grow into." },
  { href: "/tools/rental", title: "Rental Income Calculator", desc: "Run the numbers on a rental property." },
  { href: "/compare", title: "Comparison Tool", desc: "Investing vs. rentals, side by side." },
  { href: "/community", title: "Community Discussion", desc: "Talk it out with other beginners." },
];

const BEGINNER_TOPICS = [
  {
    title: "Compound interest",
    teaser: "The reason $10/day now beats $20/day starting later.",
    explainer:
      "Compound interest means you earn returns not just on what you put in, but on the returns you already earned. Left alone, small amounts snowball — time matters more than the amount you start with.",
  },
  {
    title: "Cash flow",
    teaser: "Money in, minus money out, equals what's left.",
    explainer:
      "Cash flow is simply the money coming in (like rent or a paycheck) minus the money going out (like a mortgage or expenses) over a period of time. Positive cash flow means you end up with more than you started with.",
  },
  {
    title: "Inflation",
    teaser: "Why the same $20 buys less than it used to.",
    explainer:
      "Inflation is prices rising over time, which means each dollar buys a little less than it did before. It's why 'keeping cash under the mattress' quietly loses value, even though the number on the bill never changes.",
  },
  {
    title: "Risk vs. reward",
    teaser: "Bigger potential payoff usually means bigger potential downside.",
    explainer:
      "Riskier investments can grow faster, but can also lose more. Safer options protect your money but usually grow slower. Neither is 'right' — it depends on your timeline and how you'd feel about a bad month.",
  },
  {
    title: "Diversification",
    teaser: "Don't put all your eggs in one basket — literally.",
    explainer:
      "Diversification means spreading money across different investments so one bad outcome doesn't wipe you out. It won't stop losses entirely, but it smooths out how bumpy the ride feels.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-14 sm:pt-20">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">for people just getting started</p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
          Learn money.
          <br />
          Compare options.
          <br />
          <span className="relative inline-block">
            Talk it out.
            <Squiggle className="absolute -bottom-2 left-0 h-3 w-full" />
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink/70">
          No suits, no jargon. Just simple calculators, economic news in plain English, and a
          community that won't make you feel dumb for asking.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/tools/investment"
            className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-paper hover:bg-brand-dark"
          >
            Try the Investment Calculator
          </Link>
          <Link
            href="/community"
            className="rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink hover:border-brand hover:text-brand"
          >
            See what people are saying
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {QUICK_LINKS.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="rounded-xl2 border border-line bg-white p-5 shadow-soft transition-colors hover:border-brand"
            >
              <h2 className="font-display text-base font-bold text-ink">{q.title}</h2>
              <p className="mt-1 text-sm text-ink/60">{q.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-2xl font-bold text-ink">Beginner's Corner</h2>
        <p className="mt-1 text-ink/60">Five ideas worth understanding before you do anything else with your money.</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BEGINNER_TOPICS.map((t) => (
            <BeginnerCard key={t.title} title={t.title} teaser={t.teaser} explainer={t.explainer} />
          ))}
        </div>
      </section>
    </div>
  );
}
