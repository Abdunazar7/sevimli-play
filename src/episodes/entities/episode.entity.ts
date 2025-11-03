import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Content } from "../../contents/entities/content.entity";
import { MediaFile } from "../../media-files/entities/media-file.entity";
import { Thumbnail } from "../../thumbnails/entities/thumbnail.entity";
import { Comment } from "../../comments/entities/comment.entity";
import { WatchHistory } from "../../watch-histories/entities/watch-history.entity";

@Entity("episodes")
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Content, (content) => content.episodes, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "content_id" })
  content: Content;

  @Column({ type: "int", nullable: true })
  season: number;

  @Column({ type: "int", nullable: true })
  episode_number: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "int", nullable: true })
  duration_minutes: number;

  @Column({ type: "date", nullable: true })
  release_date: Date;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date;

  @OneToMany(() => MediaFile, (media) => media.episode)
  media_files: MediaFile[];

  @OneToMany(() => Thumbnail, (thumbnail) => thumbnail.episode)
  thumbnails: Thumbnail[];

  @OneToMany(() => Comment, (comment) => comment.episode)
  comments: Comment[];

  @OneToMany(() => WatchHistory, (history) => history.episode)
  watch_histories: WatchHistory[];
}
