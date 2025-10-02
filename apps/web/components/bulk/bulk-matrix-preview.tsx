"use client";

import { useMemo, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { TextareaHTMLAttributes } from "react";

const seedConfig = {
  names: ["Launch_${audience}_${creative}"],
  utm: "utm_source=meta&utm_campaign=${campaign|default:prospecting}",
  titles: ["Scale evergreen creative", "Re-engage warm audiences"],
  bodies: ["Drive incremental revenue", "Reignite fatigued segments"],
  creatives: ["creative_A", "creative_B"],
  audiences: ["broad", "retargeting"],
  placements: ["facebook_feed", "instagram_feed"]
};

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

function MatrixInput({ label, value, onChange }: { label: string; value: string; onChange: TextareaProps["onChange"] }) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium">
      {label}
      <textarea
        className="min-h-[120px] rounded-md border border-slate-200 bg-white p-3 font-mono text-xs text-slate-700"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

export function BulkMatrixPreview() {
  const [config, setConfig] = useState(() => JSON.stringify(seedConfig, null, 2));

  const parsed = useMemo(() => {
    try {
      return JSON.parse(config);
    } catch (error) {
      return null;
    }
  }, [config]);

  const combinations = useMemo(() => {
    if (!parsed) return [];
    const creatives = parsed.creatives?.length ?? 0;
    const audiences = parsed.audiences?.length ?? 0;
    const placements = parsed.placements?.length ?? 0;
    return creatives * audiences * placements;
  }, [parsed]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <MatrixInput label="Bulk template JSON" value={config} onChange={(event) => setConfig(event.target.value)} />
        <Button size="sm" variant="primary" onClick={() => setConfig(JSON.stringify(seedConfig, null, 2))}>
          Reset template
        </Button>
      </div>
      <Card className="space-y-3 border-dashed p-4">
        <h3 className="text-lg font-semibold">Preview</h3>
        {parsed ? (
          <>
            <p className="text-sm text-slate-600">Total ad variations: {combinations}</p>
            <pre className="max-h-[320px] overflow-auto rounded-md bg-slate-950 p-3 text-xs text-white">
              {JSON.stringify(parsed, null, 2)}
            </pre>
          </>
        ) : (
          <p className="text-sm text-red-500">Invalid JSON template.</p>
        )}
      </Card>
    </div>
  );
}
