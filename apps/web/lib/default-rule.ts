import type { AutomationRule } from "@birch/shared/types";

export const defaultRule: AutomationRule = {
  name: "Scale on strong ROAS",
  scope: { level: "ad_set", ids: ["*"] },
  schedule: { cron: "*/15 * * * *" },
  filters: [
    { metric: "spend", op: ">=", value: 50, window: "1d" },
    { metric: "roas", op: ">=", value: 2.2, window: "1d" },
    { left: "cpa", op: "<=", right: "target_cpa" }
  ],
  customMetrics: [
    { name: "target_cpa", expr: "50" },
    { name: "roas", expr: "revenue/spend" }
  ],
  actions: [
    { type: "increase_budget_pct", value: 20, cap: 500 },
    { type: "notify_slack", channelId: "C123", message: "Scaled ${entity_name} by 20%" }
  ],
  dryRun: false
};
