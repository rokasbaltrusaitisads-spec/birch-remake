import { z } from "zod";

export const automationRuleSchema = z.object({
  name: z.string(),
  scope: z.object({
    level: z.enum(["account", "campaign", "ad_set", "ad"]),
    ids: z.array(z.string())
  }),
  schedule: z.object({ cron: z.string() }),
  filters: z.array(
    z.union([
      z.object({ metric: z.string(), op: z.enum(["<", "<=", ">", ">=", "==", "!="]), value: z.number(), window: z.string() }),
      z.object({ left: z.string(), op: z.enum(["<", "<=", ">", ">=", "==", "!="]), right: z.string() })
    ])
  ),
  customMetrics: z.array(
    z.object({ name: z.string(), expr: z.string(), source: z.enum(["formula", "google_sheet"]).optional() })
  ),
  actions: z.array(z.record(z.any()).and(z.object({ type: z.string() }))),
  dryRun: z.boolean()
});

export type AutomationRuleInput = z.infer<typeof automationRuleSchema>;
