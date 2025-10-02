import { describe, expect, it } from "vitest";
import { automationRuleSchema } from "../src/schemas";
import { defaultRule } from "../src/test-fixtures";

describe("automationRuleSchema", () => {
  it("validates the default rule fixture", () => {
    const parsed = automationRuleSchema.parse(defaultRule);
    expect(parsed.name).toEqual("Scale on strong ROAS");
  });
});
