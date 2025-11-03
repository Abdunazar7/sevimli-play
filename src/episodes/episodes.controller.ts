import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { EpisodesService } from "./episodes.service";
import { CreateEpisodeDto } from "./dto/create-episode.dto";
import { UpdateEpisodeDto } from "./dto/update-episode.dto";

@Controller("episodes")
export class EpisodesController {
  constructor(private readonly episodeService: EpisodesService) {}

  @Post()
  create(@Body() dto: CreateEpisodeDto) {
    return this.episodeService.create(dto);
  }

  @Get()
  findAll() {
    return this.episodeService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.episodeService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateEpisodeDto) {
    return this.episodeService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.episodeService.remove(id);
  }
}
