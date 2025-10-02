import { Module } from "@nestjs/common";
import { BoostingController } from "./boosting.controller";

@Module({
  controllers: [BoostingController]
})
export class BoostingModule {}
