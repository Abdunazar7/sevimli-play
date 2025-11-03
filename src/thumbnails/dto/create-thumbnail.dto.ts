import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
} from "class-validator";

export class CreateThumbnailDto {
  @IsInt()
  @IsNotEmpty()
  content_id: number;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsBoolean()
  is_default?: boolean;
}
