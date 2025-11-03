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
import { Profile } from "../../profiles/entities/profile.entity";
import { Content } from "../../contents/entities/content.entity";
import { Episode } from "../../episodes/entities/episode.entity";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, (profile) => profile.comments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "profile_id" })
  profile: Profile;

  @ManyToOne(() => Content, (content) => content.comments, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "content_id" })
  content?: Content;

  @ManyToOne(() => Episode, (episode) => episode.comments, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "episode_id" })
  episode?: Episode;

  @ManyToOne(() => Comment, (comment) => comment.replies, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "parent_comment_id" })
  parent_comment?: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent_comment)
  replies: Comment[];

  @Column({ type: "text" })
  text: string;

  @Column({ type: "boolean", default: false })
  is_edited: boolean;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date;
}
