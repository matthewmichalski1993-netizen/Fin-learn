export type NewsCategory = "markets" | "housing" | "inflation" | "jobs" | "policy";

export interface NewsArticle {
  id: string;
  title: string;
  date: string; // ISO date
  category: NewsCategory;
  summary: string;
  plainEnglish: string; // pre-authored fallback; toPlainEnglish() can regenerate from summary
  source: string;
}

export interface InvestmentInputs {
  initial: number;
  monthly: number;
  annualReturnPct: number;
  years: number;
}

export interface InvestmentResult {
  totalContributions: number;
  futureValue: number;
  profit: number;
  series: { year: number; balance: number; contributed: number }[];
}

export interface InvestmentScenario {
  id: string;
  name: string;
  savedAt: string;
  inputs: InvestmentInputs;
  result: InvestmentResult;
}

export interface RentalInputs {
  propertyPrice: number;
  downPaymentPct: number;
  interestRatePct: number;
  loanTermYears: number;
  monthlyRent: number;
  vacancyRatePct: number;
  monthlyExpenses: number; // maintenance + taxes + insurance + management combined
}

export interface RentalResult {
  mortgagePayment: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  cashOnCashReturnPct: number;
  cashInvested: number;
  chartData: { name: string; value: number }[];
}

export interface RentalScenario {
  id: string;
  name: string;
  savedAt: string;
  inputs: RentalInputs;
  result: RentalResult;
}

export interface ForumPost {
  id: string;
  author: string; // "Guest" for anonymous
  timestamp: string;
  content: string;
  replies: ForumReply[];
}

export interface ForumReply {
  id: string;
  author: string;
  timestamp: string;
  content: string;
}

export interface ForumTopic {
  id: string;
  name: string;
  description: string;
}

export interface MockUser {
  username: string;
}
