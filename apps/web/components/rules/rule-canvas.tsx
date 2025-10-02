"use client";

import { ComponentType, useMemo, useState } from "react";
import { Plus, Settings, Timer, Zap } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { defaultRule } from "../../lib/default-rule";
import type { AutomationRule } from "@birch/shared/types";

const sections: { id: keyof AutomationRule; label: string; description: string; icon: ComponentType<any> }[] = [
  { id: "scope", label: "Scope", description: "Select accounts, campaigns, ad sets, or ads", icon: Settings },
  { id: "filters", label: "Filters", description: "Compose metric rules and comparisons", icon: Zap },
  { id: "actions", label: "Actions", description: "Trigger Meta and notification changes", icon: Plus },
  { id: "schedule", label: "Schedule", description: "Set cron cadence or manual runs", icon: Timer }
];

export function RuleCanvas() {
  const [rule, setRule] = useState<AutomationRule>(defaultRule);

  const handleMutate = (section: keyof AutomationRule) => {
    if (section === "filters") {
      setRule((current) => ({
        ...current,
        filters: [...current.filters, { metric: "spend", op: ">=", value: 100, window: "7d" }]
      }));
    }
  };

  const summary = useMemo(
    () =>
      `${rule.scope.level.toUpperCase()} • ${rule.filters.length} filters • ${rule.actions.length} actions • ${
        rule.schedule.cron
      }`,
    [rule]
  );

  return (
    <div className="space-y-4">
      <Card className="space-y-4 p-6">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Rule canvas</h2>
            <p className="text-sm text-slate-500">Visualise the structure of your automation before saving it.</p>
          </div>
          <Button variant="primary" onClick={() => alert("Trigger test run placeholder")}>Test run</Button>
        </header>
        <p className="rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700">{summary}</p>
        <div className="grid gap-3 md:grid-cols-2">
          {sections.map((section) => (
            <Card key={section.id} className="flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2">
                <section.icon className="h-4 w-4 text-birch-500" />
                <h3 className="text-lg font-medium">{section.label}</h3>
              </div>
              <p className="text-sm text-slate-500">{section.description}</p>
              <Button variant="secondary" onClick={() => handleMutate(section.id)}>
                Add to {section.label}
              </Button>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
