import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Content } from "../../contents/entities/content.entity";
import { Episode } from "../../episodes/entities/episode.entity";

@Entity("thumbnails")
export class Thumbnail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Content, (content) => content.thumbnails, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "content_id" })
  content: Content;

  @ManyToOne(() => Episode, (episode) => episode.thumbnails, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "episode_id" })
  episode: Episode;

  @Column({ type: "varchar", length: 500 })
  url: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  type: string; // e.g., "poster", "background", "banner", etc.

  @Column({ type: "boolean", default: false })
  is_default: boolean;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date;
}
