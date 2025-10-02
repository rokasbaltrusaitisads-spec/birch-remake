import { DashboardPreview } from "../../components/dashboards/dashboard-preview";

export default function DashboardsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Dashboards & alerts</h1>
        <p className="text-slate-600">
          Lightweight KPI boards with Slack digests. Connect account metrics and share read-only links with stakeholders.
        </p>
      </header>
      <DashboardPreview />
    </div>
  );
}
