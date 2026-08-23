export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-ink/70">
        <p className="max-w-2xl">
          <strong className="text-ink">Not financial advice.</strong> FinLearn's calculators, news
          rewrites, and community posts are for learning and discussion only. Numbers here are
          estimates from the assumptions you enter — talk to a licensed financial advisor or
          accountant before making real decisions with your money.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-ink/60">
          <span>© {new Date().getFullYear()} FinLearn</span>
          <span>Built for learning, not for judging anyone's money moves.</span>
        </div>
      </div>
    </footer>
  );
}
