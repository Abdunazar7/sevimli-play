import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { People } from "./entities/person.entity";
import { CreatePeopleDto } from "./dto/create-person.dto";
import { UpdatePersonDto } from "./dto/update-person.dto";

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(People)
    private readonly peopleRepo: Repository<People>
  ) {}

  async create(dto: CreatePeopleDto): Promise<People> {
    const person = this.peopleRepo.create(dto);
    return this.peopleRepo.save(person);
  }

  async findAll(): Promise<People[]> {
    return this.peopleRepo.find({ relations: ["content_people"] });
  }

  async findOne(id: number): Promise<People> {
    const person = await this.peopleRepo.findOne({
      where: { id },
      relations: ["content_people"],
    });
    if (!person) throw new NotFoundException("Person not found");
    return person;
  }

  async update(id: number, dto: UpdatePersonDto): Promise<People> {
    const person = await this.findOne(id);
    Object.assign(person, dto);
    return this.peopleRepo.save(person);
  }

  async remove(id: number): Promise<{ message: string }> {
    const person = await this.findOne(id);
    await this.peopleRepo.remove(person);
    return { message: "Person deleted successfully" };
  }
}
