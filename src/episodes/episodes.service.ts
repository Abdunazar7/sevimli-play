import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Episode } from "./entities/episode.entity";
import { CreateEpisodeDto } from "./dto/create-episode.dto";
import { UpdateEpisodeDto } from "./dto/update-episode.dto";

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode)
    private readonly episodeRepo: Repository<Episode>
  ) {}

  async create(dto: CreateEpisodeDto): Promise<Episode> {
    const episode = this.episodeRepo.create({
      ...dto,
      content: { id: dto.content_id },
    });
    return this.episodeRepo.save(episode);
  }

  async findAll(): Promise<Episode[]> {
    return this.episodeRepo.find({
      relations: ["content", "media_files", "thumbnails"],
    });
  }

  async findOne(id: number): Promise<Episode> {
    const episode = await this.episodeRepo.findOne({
      where: { id },
      relations: ["content", "media_files", "thumbnails"],
    });
    if (!episode) throw new NotFoundException("Episode not found");
    return episode;
  }

  async update(id: number, dto: UpdateEpisodeDto): Promise<Episode> {
    const episode = await this.findOne(id);
    Object.assign(episode, {
      ...dto,
      content: dto.content_id ? { id: dto.content_id } : episode.content,
    });
    return this.episodeRepo.save(episode);
  }

  async remove(id: number): Promise<{ message: string }> {
    const episode = await this.findOne(id);
    await this.episodeRepo.remove(episode);
    return { message: "Episode deleted successfully" };
  }
}
