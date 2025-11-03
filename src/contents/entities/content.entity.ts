import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ContentType } from "../../app.constants";
import { Rating } from "../../ratings/entities/rating.entity";
import { ContentTag } from "../../content_tags/entities/content_tag.entity";
import { ContentCategory } from "../../content_categories/entities/content_category.entity";
import { ContentPeople } from "../../content_people/entities/content_person.entity";
import { Thumbnail } from "../../thumbnails/entities/thumbnail.entity";
import { MediaFile } from "../../media-files/entities/media-file.entity";
import { Episode } from "../../episodes/entities/episode.entity";
import { Comment } from "../../comments/entities/comment.entity";
import { WatchHistory } from "../../watch-histories/entities/watch-history.entity";

@Entity("contents")
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200 })
  title: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({
    type: "enum",
    enum: ContentType,
    default: ContentType.MOVIE,
  })
  type: ContentType;

  @Column({ type: "varchar", length: 500, nullable: true })
  thumbnail_url?: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  content_url?: string;

  @Column({ type: "boolean", default: true })
  is_active: boolean;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date;

  @OneToMany(() => Rating, (rating) => rating.content)
  ratings: Rating[];

  @OneToMany(() => ContentTag, (contentTag) => contentTag.content)
  content_tags: ContentTag[];

  @OneToMany(
    () => ContentCategory,
    (contentCategory) => contentCategory.content
  )
  content_categories: ContentCategory[];

  @OneToMany(() => ContentPeople, (contentPeople) => contentPeople.content)
  content_people: ContentPeople[];

  @OneToMany(() => Thumbnail, (thumbnail) => thumbnail.content)
  thumbnails: Thumbnail[];

  @OneToMany(() => MediaFile, (media) => media.content)
  media_files: MediaFile[];

  @OneToMany(() => Episode, (episode) => episode.content)
  episodes: Episode[];

  @OneToMany(() => Comment, (comment) => comment.content)
  comments: Comment[];

  @OneToMany(() => WatchHistory, (history) => history.content)
  watch_histories: WatchHistory[];
}
