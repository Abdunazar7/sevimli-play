import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MediaFile } from "./entities/media-file.entity";
import { CreateMediaFileDto } from "./dto/create-media-file.dto";
import { UpdateMediaFileDto } from "./dto/update-media-file.dto";

@Injectable()
export class MediaFilesService {
  constructor(
    @InjectRepository(MediaFile)
    private readonly mediaRepo: Repository<MediaFile>
  ) {}

  async create(dto: CreateMediaFileDto): Promise<MediaFile> {
    const media = this.mediaRepo.create({
      ...dto,
      content: dto.content_id ? { id: dto.content_id } : undefined,
      episode: dto.episode_id ? { id: dto.episode_id } : undefined,
    });
    return this.mediaRepo.save(media);
  }

  async findAll(): Promise<MediaFile[]> {
    return this.mediaRepo.find({
      relations: ["content", "episode"],
    });
  }

  async findOne(id: number): Promise<MediaFile> {
    const file = await this.mediaRepo.findOne({
      where: { id },
      relations: ["content", "episode"],
    });
    if (!file) throw new NotFoundException("Media file not found");
    return file;
  }

  async update(id: number, dto: UpdateMediaFileDto): Promise<MediaFile> {
    const file = await this.findOne(id);
    Object.assign(file, {
      ...dto,
      content: dto.content_id ? { id: dto.content_id } : file.content,
      episode: dto.episode_id ? { id: dto.episode_id } : file.episode,
    });
    return this.mediaRepo.save(file);
  }

  async remove(id: number): Promise<{ message: string }> {
    const file = await this.findOne(id);
    await this.mediaRepo.remove(file);
    return { message: "Media file deleted successfully" };
  }
}
