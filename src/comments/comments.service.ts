import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>
  ) {}

  async create(dto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepo.create({
      text: dto.text,
      profile: { id: dto.profile_id },
      content: dto.content_id ? { id: dto.content_id } : null as any,
      episode: dto.episode_id ? { id: dto.episode_id } : null as any,
      parent_comment: dto.parent_comment_id
        ? { id: dto.parent_comment_id }
        : null as any,
    });

    return this.commentRepo.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepo.find({
      relations: ["profile", "content", "episode", "replies"],
      order: { created_at: "DESC" },
    });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepo.findOne({
      where: { id },
      relations: ["profile", "content", "episode", "replies"],
    });
    if (!comment) throw new NotFoundException("Comment not found");
    return comment;
  }

  async update(id: number, dto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.findOne(id);
    Object.assign(comment, {
      text: dto.text ?? comment.text,
      is_edited: true,
    });
    return this.commentRepo.save(comment);
  }

  async remove(id: number): Promise<{ message: string }> {
    const comment = await this.findOne(id);
    await this.commentRepo.remove(comment);
    return { message: "Comment deleted successfully" };
  }
}
