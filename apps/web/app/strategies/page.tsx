import strategies from "@birch/shared/strategies";
import { Card } from "../../components/ui/card";

export const dynamic = "force-static";

export default function StrategiesPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Prebuilt strategies</h1>
        <p className="text-slate-600">Import a template to jumpstart your optimisation setup.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {strategies.map((strategy) => (
          <Card key={strategy.name} className="space-y-3 p-4">
            <div>
              <h2 className="text-xl font-semibold">{strategy.name}</h2>
              <p className="text-sm text-slate-500">{strategy.description}</p>
            </div>
            <pre className="max-h-[200px] overflow-auto rounded-md bg-slate-950 p-3 text-xs text-white">
              {JSON.stringify(strategy.rule, null, 2)}
            </pre>
          </Card>
        ))}
      </div>
    </div>
  );
}
