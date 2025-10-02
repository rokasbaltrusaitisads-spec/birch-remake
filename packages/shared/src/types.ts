export type MetricComparison = {
  left: string;
  op: "<" | "<=" | ">" | ">=" | "==" | "!=";
  right: string;
};

export type MetricThreshold = {
  metric: string;
  op: "<" | "<=" | ">" | ">=" | "==" | "!=";
  value: number;
  window: string;
};

export type CustomMetric = {
  name: string;
  expr: string;
  source?: "formula" | "google_sheet";
};

export type AutomationAction =
  | { type: "pause" | "enable" | "duplicate" | "notify_slack" | "notify_email"; [key: string]: unknown }
  | { type: "increase_budget_pct" | "decrease_budget_pct"; value: number; cap?: number }
  | { type: "set_budget" | "set_bid"; value: number };

export type AutomationRule = {
  name: string;
  scope: {
    level: "account" | "campaign" | "ad_set" | "ad";
    ids: string[];
  };
  schedule: {
    cron: string;
  };
  filters: (MetricThreshold | MetricComparison)[];
  customMetrics: CustomMetric[];
  actions: AutomationAction[];
  dryRun: boolean;
};

export type RuleRunLog = {
  id: string;
  ruleId: string;
  startedAt: string;
  completedAt?: string;
  status: "pending" | "success" | "error";
  matchedEntities: string[];
  notes: string[];
};

export type BulkTemplate = {
  names: string[];
  utm: string;
  titles: string[];
  bodies: string[];
  creatives: string[];
  audiences: string[];
  placements: string[];
};

export type BoostingConfig = {
  name: string;
  objectives: string[];
  thresholds: Record<string, number>;
  audiences: { id: string; type: "custom" | "saved" | "lookalike"; name: string }[];
  budget: { daily: number; durationDays: number };
};
