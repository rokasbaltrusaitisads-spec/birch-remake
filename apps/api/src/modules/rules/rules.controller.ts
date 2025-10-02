import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RulesService } from "./rules.service";

@Controller("rules")
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @Get()
  list() {
    return this.rulesService.list();
  }

  @Post()
  create(@Body() body: unknown) {
    return this.rulesService.create(body);
  }

  @Get(":ruleId/runs")
  listRuns(@Param("ruleId") ruleId: string) {
    return this.rulesService.listRuns(ruleId);
  }
}
