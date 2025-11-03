import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";
import { VideoQuality, Language } from "../../app.constants";

export class CreateMediaFileDto {
  @IsOptional()
  @IsInt()
  content_id?: number;

  @IsOptional()
  @IsInt()
  episode_id?: number;

  @IsEnum(VideoQuality)
  quality: VideoQuality;

  @IsOptional()
  @IsString()
  resolution?: string;

  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  drm_type?: string;

  @IsEnum(Language)
  available_langs: Language;

  @IsOptional()
  @IsInt()
  size_mb?: number;
}
