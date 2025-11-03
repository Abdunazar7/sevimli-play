import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {
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
  parent_comment_id?: number;

  @IsString()
  text: string;
}
