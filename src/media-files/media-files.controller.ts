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
import { MediaFilesService } from "./media-files.service";
import { CreateMediaFileDto } from "./dto/create-media-file.dto";
import { UpdateMediaFileDto } from "./dto/update-media-file.dto";

@Controller("media-files")
export class MediaFilesController {
  constructor(private readonly mediaService: MediaFilesService) {}

  @Post()
  create(@Body() dto: CreateMediaFileDto) {
    return this.mediaService.create(dto);
  }

  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.mediaService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateMediaFileDto
  ) {
    return this.mediaService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.mediaService.remove(id);
  }
}
