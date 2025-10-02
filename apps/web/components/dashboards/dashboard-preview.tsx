import { Card } from "../ui/card";

const metrics = [
  { label: "Spend", value: "$12,450", delta: "+8%" },
  { label: "Revenue", value: "$58,320", delta: "+12%" },
  { label: "ROAS", value: "4.68", delta: "+3%" },
  { label: "CPA", value: "$43.20", delta: "-6%" }
];

export function DashboardPreview() {
  return (
    <section className="space-y-6">
      <Card className="grid gap-4 p-6 md:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <p className="text-xs uppercase text-slate-500">{metric.label}</p>
            <p className="text-2xl font-semibold">{metric.value}</p>
            <p className="text-xs text-emerald-600">{metric.delta} vs prior 7 days</p>
          </div>
        ))}
      </Card>
      <Card className="p-6">
        <h3 className="text-lg font-semibold">Top audiences</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>Broad prospecting • ROAS 3.6 • Spend $4.1k</li>
          <li>Website visitors 7d • ROAS 6.1 • Spend $1.9k</li>
          <li>Lookalike purchasers 1% • ROAS 4.9 • Spend $3.4k</li>
        </ul>
      </Card>
    </section>
  );
}
