import { InvestmentInputs, InvestmentResult, RentalInputs, RentalResult } from "@/types";

export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

/**
 * Compound growth with a lump sum plus regular monthly contributions.
 * Contributions are applied at the end of each month, growth compounds monthly.
 */
export function calculateInvestment(inputs: InvestmentInputs): InvestmentResult {
  const { initial, monthly, annualReturnPct, years } = inputs;
  const monthlyRate = annualReturnPct / 100 / 12;
  const totalMonths = Math.max(0, Math.round(years * 12));

  const series: InvestmentResult["series"] = [];
  let balance = initial;
  let contributed = initial;

  series.push({ year: 0, balance: round2(balance), contributed: round2(contributed) });

  for (let month = 1; month <= totalMonths; month++) {
    balance = balance * (1 + monthlyRate) + monthly;
    contributed += monthly;

    if (month % 12 === 0) {
      series.push({ year: month / 12, balance: round2(balance), contributed: round2(contributed) });
    }
  }

  // Capture a partial final year if years isn't a whole number
  if (totalMonths % 12 !== 0) {
    series.push({ year: Number(years.toFixed(2)), balance: round2(balance), contributed: round2(contributed) });
  }

  const totalContributions = contributed;
  const futureValue = balance;
  const profit = futureValue - totalContributions;

  return {
    totalContributions: round2(totalContributions),
    futureValue: round2(futureValue),
    profit: round2(profit),
    series,
  };
}

/**
 * Standard amortizing mortgage payment formula, plus a simple monthly cash-flow
 * model: rent (less vacancy) minus flat monthly expenses minus the mortgage payment.
 */
export function calculateRental(inputs: RentalInputs): RentalResult {
  const {
    propertyPrice,
    downPaymentPct,
    interestRatePct,
    loanTermYears,
    monthlyRent,
    vacancyRatePct,
    monthlyExpenses,
  } = inputs;

  const downPayment = propertyPrice * (downPaymentPct / 100);
  const loanAmount = Math.max(0, propertyPrice - downPayment);
  const monthlyRate = interestRatePct / 100 / 12;
  const numPayments = loanTermYears * 12;

  let mortgagePayment = 0;
  if (loanAmount > 0 && numPayments > 0) {
    mortgagePayment =
      monthlyRate === 0
        ? loanAmount / numPayments
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
          (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  const effectiveRent = monthlyRent * (1 - vacancyRatePct / 100);
  const monthlyCashFlow = effectiveRent - monthlyExpenses - mortgagePayment;
  const annualCashFlow = monthlyCashFlow * 12;

  // Cash invested = down payment only (a simplification; closing costs are left
  // out for now — a good future enhancement once we track real transactions).
  const cashInvested = downPayment;
  const cashOnCashReturnPct = cashInvested > 0 ? (annualCashFlow / cashInvested) * 100 : 0;

  const chartData = [
    { name: "Rent (after vacancy)", value: round2(effectiveRent) },
    { name: "Mortgage", value: round2(mortgagePayment) },
    { name: "Other expenses", value: round2(monthlyExpenses) },
  ];

  return {
    mortgagePayment: round2(mortgagePayment),
    monthlyCashFlow: round2(monthlyCashFlow),
    annualCashFlow: round2(annualCashFlow),
    cashOnCashReturnPct: Math.round(cashOnCashReturnPct * 10) / 10,
    cashInvested: round2(cashInvested),
    chartData,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
