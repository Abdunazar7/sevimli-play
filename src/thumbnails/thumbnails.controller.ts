import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from "@nestjs/common";
import { ThumbnailsService } from "./thumbnails.service";
import { CreateThumbnailDto } from "./dto/create-thumbnail.dto";
import { UpdateThumbnailDto } from "./dto/update-thumbnail.dto";

@Controller("thumbnails")
export class ThumbnailsController {
  constructor(private readonly thumbnailsService: ThumbnailsService) {}

  @Post()
  create(@Body() dto: CreateThumbnailDto) {
    return this.thumbnailsService.create(dto);
  }

  @Get()
  findAll() {
    return this.thumbnailsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.thumbnailsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateThumbnailDto
  ) {
    return this.thumbnailsService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.thumbnailsService.remove(id);
  }
}
