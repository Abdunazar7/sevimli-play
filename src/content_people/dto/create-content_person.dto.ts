import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { ContentRole } from "../../app.constants";

export class CreateContentPeopleDto {
  @IsInt()
  @IsNotEmpty()
  content_id: number;

  @IsInt()
  @IsNotEmpty()
  person_id: number;

  @IsEnum(ContentRole)
  @IsOptional()
  role?: ContentRole;

  @IsOptional()
  @IsString()
  character_name?: string;
}
