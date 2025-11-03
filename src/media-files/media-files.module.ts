import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MediaFilesService } from "./media-files.service";
import { MediaFilesController } from "./media-files.controller";
import { MediaFile } from "./entities/media-file.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MediaFile])],
  controllers: [MediaFilesController],
  providers: [MediaFilesService],
  exports: [MediaFilesService],
})
export class MediaFilesModule {}
