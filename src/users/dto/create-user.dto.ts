import {
  IsEmail,
  IsString,
  Length,
  IsOptional,
  IsBoolean,
  IsPhoneNumber,
} from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 255)
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsBoolean()
  is_email_verified?: boolean;
}
