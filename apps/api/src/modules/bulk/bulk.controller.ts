import { Body, Controller, Post } from "@nestjs/common";
import { z } from "zod";
const bulkTemplateSchema = z.object({
  names: z.array(z.string()),
  utm: z.string(),
  titles: z.array(z.string()),
  bodies: z.array(z.string()),
  creatives: z.array(z.string()),
  audiences: z.array(z.string()),
  placements: z.array(z.string())
});

const bulkRunSchema = z.object({
  template: bulkTemplateSchema,
  attachRuleIds: z.array(z.string()).optional()
});

@Controller("bulk")
export class BulkController {
  @Post("runs")
  createRun(@Body() body: unknown) {
    const parsed = bulkRunSchema.parse(body);
    const creatives = parsed.template.creatives.length;
    const audiences = parsed.template.audiences.length;
    const placements = parsed.template.placements.length;

    return {
      id: "bulk-demo",
      status: "queued",
      totalCombinations: creatives * audiences * placements
    };
  }
}
