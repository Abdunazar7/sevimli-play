import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from "class-validator";

export class CreateEpisodeDto {
  @IsInt()
  content_id: number;

  @IsOptional()
  @IsInt()
  season?: number;

  @IsOptional()
  @IsInt()
  episode_number?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  duration_minutes?: number;

  @IsOptional()
  @IsDateString()
  release_date?: string;
}
