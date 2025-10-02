import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateRuleDto {
  @IsString()
  name!: string;

  @IsString()
  scope!: string;

  @IsString()
  @IsOptional()
  schedule?: string;

  @IsBoolean()
  dryRun!: boolean;
}
