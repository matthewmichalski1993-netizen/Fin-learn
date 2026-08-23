"use client";

import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { calculateRental, formatCurrency, formatPercent } from "@/lib/calculations";
import { saveRentalScenario, getRentalScenarios } from "@/lib/storage";
import { RentalInputs, RentalScenario } from "@/types";

const DEFAULTS: RentalInputs = {
  propertyPrice: 250000,
  downPaymentPct: 20,
  interestRatePct: 6.5,
  loanTermYears: 30,
  monthlyRent: 2000,
  vacancyRatePct: 5,
  monthlyExpenses: 350,
};

const BAR_COLORS = ["#2F6F4F", "#C0533E", "#F4B740"];

export default function RentalCalculatorPage() {
  const [inputs, setInputs] = useState<RentalInputs>(DEFAULTS);
  const [scenarioName, setScenarioName] = useState("My rental property");
  const [savedMessage, setSavedMessage] = useState("");
  const [savedCount, setSavedCount] = useState(() => getRentalScenarios().length);

  const result = useMemo(() => calculateRental(inputs), [inputs]);

  const set = (key: keyof RentalInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setInputs((prev) => ({ ...prev, [key]: isNaN(value) ? 0 : value }));
  };

  const handleSave = () => {
    const scenario: RentalScenario = {
      id: `rent-${Date.now()}`,
      name: scenarioName || "Untitled scenario",
      savedAt: new Date().toISOString(),
      inputs,
      result,
    };
    saveRentalScenario(scenario);
    setSavedCount(getRentalScenarios().length);
    setSavedMessage("Scenario saved. Find it in the Comparison Tool.");
    setTimeout(() => setSavedMessage(""), 3500);
  };

  const cashFlowPositive = result.monthlyCashFlow >= 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-ink">Rental Income Calculator</h1>
      <p className="mt-2 max-w-2xl text-ink/60">
        Estimate monthly cash flow on a rental property after the mortgage, vacancy, and typical
        expenses. Closing costs and big repairs aren't included yet — keep some buffer in mind.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[380px_1fr]">
        <div className="space-y-4 rounded-xl2 border border-line bg-white p-6 shadow-soft">
          <Field label="Property price" prefix="$" value={inputs.propertyPrice} onChange={set("propertyPrice")} />
          <Field label="Down payment" suffix="%" value={inputs.downPaymentPct} onChange={set("downPaymentPct")} />
          <Field label="Interest rate" suffix="%" step="0.1" value={inputs.interestRatePct} onChange={set("interestRatePct")} />
          <Field label="Loan term" suffix="yrs" value={inputs.loanTermYears} onChange={set("loanTermYears")} />
          <Field label="Monthly rent" prefix="$" value={inputs.monthlyRent} onChange={set("monthlyRent")} />
          <Field label="Vacancy rate" suffix="%" value={inputs.vacancyRatePct} onChange={set("vacancyRatePct")} />
          <Field
            label="Monthly expenses"
            prefix="$"
            value={inputs.monthlyExpenses}
            onChange={set("monthlyExpenses")}
          />
          <p className="text-xs text-ink/40">Maintenance, taxes, insurance, and management combined.</p>

          <div className="pt-2">
            <label className="block text-sm font-medium text-ink/70">Scenario name</label>
            <input
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-line px-3 py-2"
            />
            <button
              onClick={handleSave}
              className="mt-3 w-full rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-paper hover:bg-brand-dark"
            >
              Save Scenario
            </button>
            {savedMessage && <p className="mt-2 text-xs font-medium text-brand">{savedMessage}</p>}
            <p className="mt-1 text-xs text-ink/40">{savedCount} scenario(s) saved on this device.</p>
          </div>
        </div>

        <div>
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultStat
              label="Monthly cash flow"
              value={formatCurrency(result.monthlyCashFlow)}
              tone={cashFlowPositive ? "good" : "bad"}
            />
            <ResultStat
              label="Annual cash flow"
              value={formatCurrency(result.annualCashFlow)}
              tone={cashFlowPositive ? "good" : "bad"}
            />
            <ResultStat label="Cash-on-cash return" value={formatPercent(result.cashOnCashReturnPct)} />
          </div>

          <div className="mt-6 h-80 rounded-xl2 border border-line bg-white p-4 shadow-soft">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={result.chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E0D6" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `$${v}`} tick={{ fontSize: 12 }} width={60} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {result.chartData.map((_, i) => (
                    <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs text-ink/40">
            Monthly mortgage payment estimate: {formatCurrency(result.mortgagePayment)} · Cash invested (down
            payment): {formatCurrency(result.cashInvested)}
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step,
}: {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prefix?: string;
  suffix?: string;
  step?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink/70">{label}</label>
      <div className="mt-1 flex items-center rounded-lg border border-line bg-white px-3 focus-within:border-brand">
        {prefix && <span className="text-ink/40">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={onChange}
          step={step || "1"}
          className="w-full bg-transparent py-2 pl-1 font-mono outline-none"
        />
        {suffix && <span className="text-ink/40 text-sm">{suffix}</span>}
      </div>
    </div>
  );
}

function ResultStat({ label, value, tone }: { label: string; value: string; tone?: "good" | "bad" }) {
  const color = tone === "good" ? "text-brand" : tone === "bad" ? "text-danger" : "text-ink";
  return (
    <div className="rounded-xl2 border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-medium uppercase tracking-wide text-ink/50">{label}</p>
      <p className={`mt-1 font-mono text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
