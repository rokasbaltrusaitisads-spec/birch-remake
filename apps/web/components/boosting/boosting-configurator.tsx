"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const defaultConfig = {
  name: "Engagement booster",
  objectives: ["REACH", "POST_ENGAGEMENT"],
  thresholds: {
    reactions: 50,
    comments: 10,
    saves: 5
  },
  audiences: [
    { id: "custom_audience_1", type: "custom", name: "Website visitors 30d" },
    { id: "lookalike_1", type: "lookalike", name: "Purchasers LAL 1%" }
  ],
  budget: {
    daily: 200,
    durationDays: 7
  }
};

export function BoostingConfigurator() {
  const [config, setConfig] = useState(() => JSON.stringify(defaultConfig, null, 2));

  const handleSave = () => {
    alert("Post boosting config saved (placeholder)");
  };

  return (
    <Card className="space-y-4 p-6">
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold">Configurator</h2>
        <p className="text-sm text-slate-500">
          This form mirrors the payload expected by the API and will soon be connected to real ad account data.
        </p>
      </header>
      <textarea
        className="min-h-[320px] w-full rounded-md border border-slate-200 bg-slate-950 p-3 font-mono text-xs text-white"
        value={config}
        onChange={(event) => setConfig(event.target.value)}
      />
      <div className="flex justify-end">
        <Button onClick={handleSave}>Save configuration</Button>
      </div>
    </Card>
  );
}
