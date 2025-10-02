import { BoostingConfigurator } from "../../components/boosting/boosting-configurator";

export default function BoostingPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Post boosting</h1>
        <p className="text-slate-600">
          Configure automations that detect organic posts matching engagement thresholds and boost them while preserving social
          proof.
        </p>
      </header>
      <BoostingConfigurator />
    </div>
  );
}
