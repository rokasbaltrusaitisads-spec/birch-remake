import type { AutomationRule } from "./types";

type Strategy = {
  name: string;
  description: string;
  rule: AutomationRule;
};

const strategies: Strategy[] = [
  {
    name: "Scale on strong ROAS",
    description: "Increase budgets when ROAS and spend thresholds are met.",
    rule: {
      name: "Scale on strong ROAS",
      scope: { level: "ad_set", ids: ["*"] },
      schedule: { cron: "*/15 * * * *" },
      filters: [
        { metric: "spend", op: ">=", value: 100, window: "1d" },
        { metric: "roas", op: ">=", value: 2.5, window: "1d" },
        { left: "cpa", op: "<=", right: "target_cpa" }
      ],
      customMetrics: [
        { name: "target_cpa", expr: "65" },
        { name: "roas", expr: "revenue/spend" }
      ],
      actions: [
        { type: "increase_budget_pct", value: 20, cap: 800 },
        { type: "notify_slack", channelId: "marketing", message: "Scaled ${entity_name}" }
      ],
      dryRun: false
    }
  },
  {
    name: "Cut loss makers",
    description: "Pause ad sets when spend is high and ROAS is low.",
    rule: {
      name: "Cut loss makers",
      scope: { level: "ad_set", ids: ["*"] },
      schedule: { cron: "*/30 * * * *" },
      filters: [
        { metric: "spend", op: ">=", value: 150, window: "3d" },
        { metric: "roas", op: "<", value: 1.2, window: "3d" }
      ],
      customMetrics: [],
      actions: [{ type: "pause" }, { type: "notify_email", to: "team@example.com" }],
      dryRun: false
    }
  },
  {
    name: "Creative fatigue guard",
    description: "Duplicate top ads into fresh ad sets when frequency spikes.",
    rule: {
      name: "Creative fatigue guard",
      scope: { level: "ad", ids: ["*"] },
      schedule: { cron: "0 */6 * * *" },
      filters: [
        { metric: "frequency", op: ">", value: 5, window: "7d" },
        { metric: "ctr", op: "<", value: 0.8, window: "7d" }
      ],
      customMetrics: [],
      actions: [{ type: "duplicate", destination: "new_ad_set" }],
      dryRun: true
    }
  },
  {
    name: "Target CPA guardian",
    description: "Scale down bids when CPA exceeds the sheet-provided target.",
    rule: {
      name: "Target CPA guardian",
      scope: { level: "campaign", ids: ["*"] },
      schedule: { cron: "15 * * * *" },
      filters: [
        { metric: "cpa", op: ">", value: 75, window: "1d" },
        { left: "cpa", op: ">", right: "sheet.target_cpa" }
      ],
      customMetrics: [{ name: "sheet.target_cpa", expr: "GOOGLE_SHEETS(targets!B2)" }],
      actions: [
        { type: "decrease_budget_pct", value: 15 },
        { type: "notify_slack", channelId: "alerts", message: "CPA exceeded targets for ${entity_name}" }
      ],
      dryRun: false
    }
  },
  {
    name: "Spend accelerator",
    description: "Increase spend on campaigns that are underspending versus targets.",
    rule: {
      name: "Spend accelerator",
      scope: { level: "campaign", ids: ["*"] },
      schedule: { cron: "*/15 * * * *" },
      filters: [
        { left: "spend", op: "<", right: "sheet.target_spend" },
        { metric: "revenue", op: ">=", value: 1000, window: "1d" }
      ],
      customMetrics: [{ name: "sheet.target_spend", expr: "GOOGLE_SHEETS(targets!B3)" }],
      actions: [{ type: "increase_budget_pct", value: 10 }, { type: "notify_slack", channelId: "alerts" }],
      dryRun: false
    }
  },
  {
    name: "ROAS win notification",
    description: "Send Slack alerts when ads exceed ROAS goals without changing bids.",
    rule: {
      name: "ROAS win notification",
      scope: { level: "ad", ids: ["*"] },
      schedule: { cron: "*/15 * * * *" },
      filters: [
        { metric: "roas", op: ">=", value: 4, window: "1d" },
        { metric: "spend", op: ">=", value: 50, window: "1d" }
      ],
      customMetrics: [],
      actions: [{ type: "notify_slack", channelId: "wins", message: "ROAS hit ${metric:roas}" }],
      dryRun: false
    }
  }
];

export default strategies;
export type { Strategy };
