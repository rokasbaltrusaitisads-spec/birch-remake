import Link from "next/link";
import { RuleCanvas } from "../../components/rules/rule-canvas";
import { RuleJsonPreview } from "../../components/rules/rule-json-preview";

export default function RulesPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Automation Rules</h1>
        <p className="text-slate-600">
          Construct complex Meta automation workflows with custom metrics, multi-step actions, and per-entity scheduling. This
          scaffold renders a placeholder canvas and live JSON preview that will be wired into the rules engine in future tasks.
        </p>
        <div className="flex gap-3">
          <Link className="text-sm font-medium text-birch-600" href="/docs/automation-overview">
            Automation guide
          </Link>
          <Link className="text-sm font-medium text-birch-600" href="/strategies">
            Prebuilt strategies
          </Link>
        </div>
      </header>
      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <RuleCanvas />
        <RuleJsonPreview />
      </div>
    </div>
  );
}
