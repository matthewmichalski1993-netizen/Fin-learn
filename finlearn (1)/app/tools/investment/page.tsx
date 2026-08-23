"use client";

import { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { calculateInvestment, formatCurrency } from "@/lib/calculations";
import { saveInvestmentScenario, getInvestmentScenarios } from "@/lib/storage";
import { InvestmentInputs, InvestmentScenario } from "@/types";
import { Squiggle } from "@/components/Squiggle";

const DEFAULTS: InvestmentInputs = { initial: 1000, monthly: 200, annualReturnPct: 7, years: 20 };

export default function InvestmentCalculatorPage() {
  const [inputs, setInputs] = useState<InvestmentInputs>(DEFAULTS);
  const [scenarioName, setScenarioName] = useState("My investing plan");
  const [savedMessage, setSavedMessage] = useState("");
  const [savedCount, setSavedCount] = useState(() => getInvestmentScenarios().length);

  const result = useMemo(() => calculateInvestment(inputs), [inputs]);

  const set = (key: keyof InvestmentInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setInputs((prev) => ({ ...prev, [key]: isNaN(value) ? 0 : value }));
  };

  const handleSave = () => {
    const scenario: InvestmentScenario = {
      id: `inv-${Date.now()}`,
      name: scenarioName || "Untitled scenario",
      savedAt: new Date().toISOString(),
      inputs,
      result,
    };
    saveInvestmentScenario(scenario);
    setSavedCount(getInvestmentScenarios().length);
    setSavedMessage("Scenario saved. Find it in the Comparison Tool.");
    setTimeout(() => setSavedMessage(""), 3500);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-ink">Investment Calculator</h1>
      <p className="mt-2 max-w-2xl text-ink/60">
        Estimate what a lump sum plus regular monthly contributions could grow into, assuming a
        steady annual return. Real markets don't grow in a straight line — treat this as a
        rough sketch, not a promise.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[380px_1fr]">
        <div className="space-y-4 rounded-xl2 border border-line bg-white p-6 shadow-soft">
          <Field label="Initial investment" prefix="$" value={inputs.initial} onChange={set("initial")} />
          <Field label="Monthly contribution" prefix="$" value={inputs.monthly} onChange={set("monthly")} />
          <Field label="Annual return" suffix="%" value={inputs.annualReturnPct} onChange={set("annualReturnPct")} step="0.1" />
          <Field label="Years" value={inputs.years} onChange={set("years")} />

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
            <ResultStat label="Total contributions" value={formatCurrency(result.totalContributions)} />
            <ResultStat label="Future value" value={formatCurrency(result.futureValue)} highlight />
            <ResultStat label="Profit" value={formatCurrency(result.profit)} />
          </div>

          <div className="mt-6 h-80 rounded-xl2 border border-line bg-white p-4 shadow-soft">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={result.series} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E0D6" />
                <XAxis dataKey="year" tickFormatter={(y) => `Yr ${y}`} tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `$${Math.round(v / 1000)}k`} tick={{ fontSize: 12 }} width={50} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} labelFormatter={(y) => `Year ${y}`} />
                <Legend />
                <Line type="monotone" dataKey="balance" name="Balance" stroke="#2F6F4F" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="contributed" name="Contributed" stroke="#8B9A8E" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
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
        {suffix && <span className="text-ink/40">{suffix}</span>}
      </div>
    </div>
  );
}

function ResultStat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-xl2 border border-line bg-white p-4 shadow-soft">
      <p className="text-xs font-medium uppercase tracking-wide text-ink/50">{label}</p>
      <p className={`mt-1 font-mono text-2xl font-bold ${highlight ? "text-brand" : "text-ink"}`}>{value}</p>
      {highlight && <Squiggle className="mt-1 h-2 w-16" />}
    </div>
  );
}
