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
import { WatchHistoriesService } from "./watch-histories.service";
import { CreateWatchHistoryDto } from "./dto/create-watch-history.dto";
import { UpdateWatchHistoryDto } from "./dto/update-watch-history.dto";

@Controller("watch-histories")
export class WatchHistoriesController {
  constructor(private readonly watchHistoriesService: WatchHistoriesService) {}

  @Post()
  create(@Body() dto: CreateWatchHistoryDto) {
    return this.watchHistoriesService.create(dto);
  }

  @Get()
  findAll() {
    return this.watchHistoriesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.watchHistoriesService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateWatchHistoryDto
  ) {
    return this.watchHistoriesService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.watchHistoriesService.remove(id);
  }
}
