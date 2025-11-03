import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
import { Content } from "../../contents/entities/content.entity";
import { People } from "../../people/entities/person.entity";
import { ContentRole } from "../../app.constants";

@Entity("content_people")
export class ContentPeople {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Content, (content) => content.content_people, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "content_id" })
  content: Content;

  @ManyToOne(() => People, (person) => person.content_people, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "person_id" })
  person: People;

  @Column({ type: "enum", enum: ContentRole, default: ContentRole.ACTOR })
  role: ContentRole;

  @Column({ type: "varchar", length: 255, nullable: true })
  character_name: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date;
}
