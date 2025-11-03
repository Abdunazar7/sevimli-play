import { PartialType } from "@nestjs/mapped-types";
import { CreateContentPeopleDto } from "./create-content_person.dto";

export class UpdateContentPeopleDto extends PartialType(
  CreateContentPeopleDto
) {}
