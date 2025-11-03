import { IsInt, IsOptional, IsBoolean } from "class-validator";

export class CreateWatchHistoryDto {
  @IsInt()
  profile_id: number;

  @IsOptional()
  @IsInt()
  content_id?: number;

  @IsOptional()
  @IsInt()
  episode_id?: number;

  @IsOptional()
  @IsInt()
  progress_seconds?: number;

  @IsOptional()
  @IsBoolean()
  is_completed?: boolean;
}
