import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThumbnailsService } from "./thumbnails.service";
import { ThumbnailsController } from "./thumbnails.controller";
import { Thumbnail } from "./entities/thumbnail.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Thumbnail])],
  controllers: [ThumbnailsController],
  providers: [ThumbnailsService],
  exports: [ThumbnailsService],
})
export class ThumbnailsModule {}
