import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ContentPeople } from "../../content_people/entities/content_person.entity";

@Entity("people")
export class People {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  full_name: string;

  @Column({ type: "text", nullable: true })
  bio: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  photo_url: string;

  @Column({ type: "date", nullable: true })
  birth_date: Date;

  @OneToMany(() => ContentPeople, (contentPeople) => contentPeople.person)
  content_people: ContentPeople[];

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date;
}
