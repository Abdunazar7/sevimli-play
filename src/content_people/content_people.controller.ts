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
import { ContentPeopleService } from "./content_people.service";
import { CreateContentPeopleDto } from "./dto/create-content_person.dto";
import { UpdateContentPeopleDto } from "./dto/update-content_person.dto";

@Controller("content-people")
export class ContentPeopleController {
  constructor(private readonly contentPeopleService: ContentPeopleService) {}

  @Post()
  create(@Body() dto: CreateContentPeopleDto) {
    return this.contentPeopleService.create(dto);
  }

  @Get()
  findAll() {
    return this.contentPeopleService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.contentPeopleService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentPeopleDto
  ) {
    return this.contentPeopleService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.contentPeopleService.remove(id);
  }
}
