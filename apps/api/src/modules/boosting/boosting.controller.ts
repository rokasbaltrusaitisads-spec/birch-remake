import { Body, Controller, Post } from "@nestjs/common";
import { z } from "zod";

const boostingSchema = z.object({
  name: z.string(),
  objectives: z.array(z.string()),
  thresholds: z.record(z.number()),
  audiences: z.array(
    z.object({
      id: z.string(),
      type: z.enum(["custom", "saved", "lookalike"]),
      name: z.string()
    })
  ),
  budget: z.object({
    daily: z.number(),
    durationDays: z.number()
  })
});

@Controller("boosting")
export class BoostingController {
  @Post("configs")
  upsert(@Body() body: unknown) {
    const config = boostingSchema.parse(body);
    return { status: "ok", config };
  }
}
