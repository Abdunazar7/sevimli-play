import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Thumbnail } from "./entities/thumbnail.entity";
import { CreateThumbnailDto } from "./dto/create-thumbnail.dto";
import { UpdateThumbnailDto } from "./dto/update-thumbnail.dto";

@Injectable()
export class ThumbnailsService {
  constructor(
    @InjectRepository(Thumbnail)
    private readonly thumbnailRepo: Repository<Thumbnail>
  ) {}

  async create(dto: CreateThumbnailDto): Promise<Thumbnail> {
    const thumbnail = this.thumbnailRepo.create({
      ...dto,
      content: { id: dto.content_id },
    });
    return this.thumbnailRepo.save(thumbnail);
  }

  async findAll(): Promise<Thumbnail[]> {
    return this.thumbnailRepo.find({ relations: ["content"] });
  }

  async findOne(id: number): Promise<Thumbnail> {
    const thumb = await this.thumbnailRepo.findOne({
      where: { id },
      relations: ["content"],
    });
    if (!thumb) throw new NotFoundException("Thumbnail not found");
    return thumb;
  }

  async update(id: number, dto: UpdateThumbnailDto): Promise<Thumbnail> {
    const thumb = await this.findOne(id);
    Object.assign(thumb, {
      ...dto,
      content: dto.content_id ? { id: dto.content_id } : thumb.content,
    });
    return this.thumbnailRepo.save(thumb);
  }

  async remove(id: number): Promise<{ message: string }> {
    const thumb = await this.findOne(id);
    await this.thumbnailRepo.remove(thumb);
    return { message: "Thumbnail deleted successfully" };
  }
}
