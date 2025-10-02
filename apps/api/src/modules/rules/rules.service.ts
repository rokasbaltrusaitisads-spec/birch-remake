import { Injectable } from "@nestjs/common";
import { automationRuleSchema } from "@birch/shared/schemas";
import strategies from "@birch/shared/strategies";
import { defaultRule } from "@birch/shared/test-fixtures";
import { AutomationRule, RuleRunLog } from "@birch/shared/types";

@Injectable()
export class RulesService {
  private rules: AutomationRule[] = [defaultRule, ...strategies.map((strategy) => strategy.rule)];

  list() {
    return this.rules;
  }

  create(rule: unknown) {
    const parsed = automationRuleSchema.parse(rule) as AutomationRule;
    this.rules = [...this.rules, parsed];
    return parsed;
  }

  listRuns(ruleId: string): RuleRunLog[] {
    return [
      {
        id: "demo",
        ruleId,
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        status: "success",
        matchedEntities: ["act_123", "act_456"],
        notes: ["Filters matched", "Budget increased by 20%"]
      }
    ];
  }
}
