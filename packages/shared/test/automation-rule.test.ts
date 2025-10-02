import { describe, expect, it } from "vitest";
import { automationRuleSchema } from "../src/schemas";
import { defaultRule } from "../src/test-fixtures";

describe("automationRuleSchema", () => {
  it("validates the default rule fixture", () => {
    const parsed = automationRuleSchema.parse(defaultRule);
    expect(parsed.name).toEqual("Scale on strong ROAS");
  });

  it("supports multi-action automations", () => {
    const parsed = automationRuleSchema.parse(defaultRule);
    expect(parsed.actions).toHaveLength(2);
    expect(parsed.actions?.map((action) => action.type)).toContain("notify_slack");
  });
});
