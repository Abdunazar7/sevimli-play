import { PartialType } from "@nestjs/mapped-types";
import { CreateAdminDto } from "./create-admin.dto";
import { IsOptional, IsString, IsIn, IsBoolean } from "class-validator";

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsIn(["superadmin", "moderator"])
  role?: "superadmin" | "moderator";

  @IsOptional()
  @IsBoolean()
  is_creator?: boolean;
}
