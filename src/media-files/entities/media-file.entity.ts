import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Content } from "../../contents/entities/content.entity";
import { Episode } from "../../episodes/entities/episode.entity";
import { VideoQuality, Language } from "../../app.constants";

@Entity("media_files")
export class MediaFile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Content, (content) => content.media_files, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "content_id" })
  content: Content;

  @ManyToOne(() => Episode, (episode) => episode.media_files, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "episode_id" })
  episode: Episode;

  @Column({ type: "enum", enum: VideoQuality, default: VideoQuality.HD })
  quality: VideoQuality;

  @Column({ type: "varchar", length: 100, nullable: true })
  resolution: string;

  @Column({ type: "varchar", length: 500 })
  url: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  drm_type: string;

  @Column({ type: "enum", enum: Language, default: Language.UZ })
  available_langs: Language;

  @Column({ type: "integer", nullable: true })
  size_mb: number;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date;
}
