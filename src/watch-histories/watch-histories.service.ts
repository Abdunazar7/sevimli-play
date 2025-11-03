import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WatchHistory } from "./entities/watch-history.entity";
import { CreateWatchHistoryDto } from "./dto/create-watch-history.dto";
import { UpdateWatchHistoryDto } from "./dto/update-watch-history.dto";

@Injectable()
export class WatchHistoriesService {
  constructor(
    @InjectRepository(WatchHistory)
    private readonly watchRepo: Repository<WatchHistory>
  ) {}

  async create(dto: CreateWatchHistoryDto): Promise<WatchHistory> {
    const history = this.watchRepo.create({
      ...dto,
      profile: { id: dto.profile_id },
      content: dto.content_id ? { id: dto.content_id } : null as any,
      episode: dto.episode_id ? { id: dto.episode_id } : null as any,
    });
    return this.watchRepo.save(history);
  }

  async findAll(): Promise<WatchHistory[]> {
    return this.watchRepo.find({
      relations: ["profile", "content", "episode"],
      order: { updated_at: "DESC" },
    });
  }

  async findOne(id: number): Promise<WatchHistory> {
    const history = await this.watchRepo.findOne({
      where: { id },
      relations: ["profile", "content", "episode"],
    });
    if (!history) throw new NotFoundException("Watch history not found");
    return history;
  }

  async update(id: number, dto: UpdateWatchHistoryDto): Promise<WatchHistory> {
    const history = await this.findOne(id);
    Object.assign(history, {
      ...dto,
      profile: dto.profile_id ? { id: dto.profile_id } : history.profile,
      content: dto.content_id ? { id: dto.content_id } : history.content,
      episode: dto.episode_id ? { id: dto.episode_id } : history.episode,
    });
    return this.watchRepo.save(history);
  }

  async remove(id: number): Promise<{ message: string }> {
    const history = await this.findOne(id);
    await this.watchRepo.remove(history);
    return { message: "Watch history deleted successfully" };
  }
}
