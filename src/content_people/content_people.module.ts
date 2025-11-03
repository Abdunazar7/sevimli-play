import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContentPeopleService } from "./content_people.service";
import { ContentPeopleController } from "./content_people.controller";
import { ContentPeople } from "./entities/content_person.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ContentPeople])],
  controllers: [ContentPeopleController],
  providers: [ContentPeopleService],
  exports: [ContentPeopleService],
})
export class ContentPeopleModule {}
