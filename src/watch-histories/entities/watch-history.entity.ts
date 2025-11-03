import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Profile } from "../../profiles/entities/profile.entity";
import { Content } from "../../contents/entities/content.entity";
import { Episode } from "../../episodes/entities/episode.entity";

@Entity("watch_histories")
export class WatchHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, (profile) => profile.watch_histories, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "profile_id" })
  profile: Profile;

  @ManyToOne(() => Content, (content) => content.watch_histories, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "content_id" })
  content?: Content;

  @ManyToOne(() => Episode, (episode) => episode.watch_histories, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "episode_id" })
  episode?: Episode;

  @Column({ type: "int", default: 0 })
  progress_seconds: number; // qancha vaqt tomosha qilingan (sekundlarda)

  @Column({ type: "boolean", default: false })
  is_completed: boolean; // to‘liq tugatilganmi

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date;
}
