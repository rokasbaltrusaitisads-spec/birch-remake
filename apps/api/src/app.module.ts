import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { ThrottlerModule } from "@nestjs/throttler";
import { RulesModule } from "./modules/rules/rules.module";
import { BulkModule } from "./modules/bulk/bulk.module";
import { BoostingModule } from "./modules/boosting/boosting.module";
import { HealthModule } from "./modules/health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot({ ttl: 60, limit: 120 }),
    HealthModule,
    RulesModule,
    BulkModule,
    BoostingModule
  ]
})
export class AppModule {}
