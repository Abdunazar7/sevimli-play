import { IsString, IsOptional, IsDateString } from "class-validator";

export class CreatePeopleDto {
  @IsString()
  full_name: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  photo_url?: string;

  @IsOptional()
  @IsDateString()
  birth_date?: string;
}
