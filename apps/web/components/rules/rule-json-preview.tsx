"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import { defaultRule } from "../../lib/default-rule";
import { Button } from "../ui/button";

export function RuleJsonPreview() {
  const [json, setJson] = useState(() => JSON.stringify(defaultRule, null, 2));

  return (
    <Card className="flex h-full flex-col p-4">
      <header className="mb-2 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">JSON preview</h3>
          <p className="text-xs text-slate-500">The rule DSL payload that is sent to the automation API.</p>
        </div>
        <Button size="sm" variant="ghost" onClick={() => setJson(JSON.stringify(defaultRule, null, 2))}>
          Reset
        </Button>
      </header>
      <textarea
        className="min-h-[400px] flex-1 rounded-md border border-slate-200 bg-slate-950 p-3 font-mono text-xs text-white"
        value={json}
        onChange={(event) => setJson(event.target.value)}
      />
    </Card>
  );
}
