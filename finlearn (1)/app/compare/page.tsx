"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getInvestmentScenarios, getRentalScenarios } from "@/lib/storage";
import { formatCurrency, formatPercent } from "@/lib/calculations";
import { InvestmentScenario, RentalScenario } from "@/types";

export default function ComparisonPage() {
  const [investScenarios, setInvestScenarios] = useState<InvestmentScenario[]>([]);
  const [rentalScenarios, setRentalScenarios] = useState<RentalScenario[]>([]);
  const [investId, setInvestId] = useState<string>("");
  const [rentalId, setRentalId] = useState<string>("");

  useEffect(() => {
    const inv = getInvestmentScenarios();
    const rent = getRentalScenarios();
    setInvestScenarios(inv);
    setRentalScenarios(rent);
    if (inv[0]) setInvestId(inv[0].id);
    if (rent[0]) setRentalId(rent[0].id);
  }, []);

  const invest = investScenarios.find((s) => s.id === investId);
  const rental = rentalScenarios.find((s) => s.id === rentalId);

  if (investScenarios.length === 0 || rentalScenarios.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-bold text-ink">Comparison Tool</h1>
        <p className="mt-3 text-ink/60">
          Save at least one scenario from each calculator to compare them side by side.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/tools/investment" className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-paper">
            Go to Investment Calculator
          </Link>
          <Link href="/tools/rental" className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink">
            Go to Rental Calculator
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-ink">Comparison Tool</h1>
      <p className="mt-2 text-ink/60">Pick one saved scenario from each calculator to line up side by side.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <ScenarioPicker label="Investment scenario" scenarios={investScenarios} value={investId} onChange={setInvestId} />
        <ScenarioPicker label="Rental scenario" scenarios={rentalScenarios} value={rentalId} onChange={setRentalId} />
      </div>

      {invest && rental && (
        <>
          <div className="mt-8 overflow-hidden rounded-xl2 border border-line bg-white shadow-soft">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-brand-light text-left">
                  <th className="px-4 py-3 font-semibold text-ink/70">Metric</th>
                  <th className="px-4 py-3 font-semibold text-ink">{invest.name}</th>
                  <th className="px-4 py-3 font-semibold text-ink">{rental.name}</th>
                </tr>
              </thead>
              <tbody>
                <Row
                  label="Total projected value"
                  left={formatCurrency(invest.result.futureValue)}
                  right={`${formatCurrency(rental.inputs.propertyPrice)} property value (unchanged estimate)`}
                />
                <Row
                  label="Annual cash flow / growth"
                  left={`${formatCurrency(invest.result.profit)} profit over ${invest.inputs.years} yrs`}
                  right={formatCurrency(rental.result.annualCashFlow)}
                />
                <Row
                  label="Cash required up front"
                  left={formatCurrency(invest.inputs.initial)}
                  right={formatCurrency(rental.result.cashInvested)}
                />
                <Row label="Liquidity" left="High — sell shares in a day or two" right="Low — selling a house takes weeks to months" />
                <Row
                  label="Effort"
                  left="Low — mostly set-and-forget"
                  right="High — tenants, repairs, and paperwork"
                />
                <Row
                  label="Risk notes"
                  left="Value can swing with the market year to year"
                  right={
                    rental.result.monthlyCashFlow >= 0
                      ? "Cash-flow positive here, but a vacancy or repair month can flip that fast"
                      : "Currently cash-flow negative in this scenario — you'd cover the gap out of pocket"
                  }
                />
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-xl2 border border-line bg-white p-5 shadow-soft">
            <h2 className="font-display text-lg font-bold text-ink">In plain English</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">
              Investing tends to be the easier, more hands-off path — you can start with less
              money, and you can cash out relatively quickly if you need to. Rental property
              usually takes more money up front and more ongoing effort, but it can produce
              steady monthly income and the property itself may gain value over time. Neither
              is universally "better" — it comes down to how much cash and time you have, and
              whether you'd rather manage a spreadsheet or a property.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function ScenarioPicker({
  label,
  scenarios,
  value,
  onChange,
}: {
  label: string;
  scenarios: { id: string; name: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink/70">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2"
      >
        {scenarios.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function Row({ label, left, right }: { label: string; left: string; right: string }) {
  return (
    <tr className="border-b border-line last:border-0">
      <td className="px-4 py-3 font-medium text-ink/60">{label}</td>
      <td className="px-4 py-3 font-mono text-ink">{left}</td>
      <td className="px-4 py-3 font-mono text-ink">{right}</td>
    </tr>
  );
}
