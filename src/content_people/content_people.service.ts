import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ContentPeople } from "./entities/content_person.entity";
import { CreateContentPeopleDto } from "./dto/create-content_person.dto";
import { UpdateContentPeopleDto } from "./dto/update-content_person.dto";

@Injectable()
export class ContentPeopleService {
  constructor(
    @InjectRepository(ContentPeople)
    private readonly contentPeopleRepo: Repository<ContentPeople>
  ) {}

  async create(dto: CreateContentPeopleDto): Promise<ContentPeople> {
    const relation = this.contentPeopleRepo.create({
      content: { id: dto.content_id },
      person: { id: dto.person_id },
      role: dto.role,
      character_name: dto.character_name,
    });
    return this.contentPeopleRepo.save(relation);
  }

  async findAll(): Promise<ContentPeople[]> {
    return this.contentPeopleRepo.find({
      relations: ["content", "person"],
    });
  }

  async findOne(id: number): Promise<ContentPeople> {
    const relation = await this.contentPeopleRepo.findOne({
      where: { id },
      relations: ["content", "person"],
    });
    if (!relation) throw new NotFoundException("Relation not found");
    return relation;
  }

  async update(
    id: number,
    dto: UpdateContentPeopleDto
  ): Promise<ContentPeople> {
    const relation = await this.findOne(id);
    Object.assign(relation, {
      content: dto.content_id ? { id: dto.content_id } : relation.content,
      person: dto.person_id ? { id: dto.person_id } : relation.person,
      role: dto.role ?? relation.role,
      character_name: dto.character_name ?? relation.character_name,
    });
    return this.contentPeopleRepo.save(relation);
  }

  async remove(id: number): Promise<{ message: string }> {
    const relation = await this.findOne(id);
    await this.contentPeopleRepo.remove(relation);
    return { message: "Content-Person relation deleted successfully" };
  }
}
