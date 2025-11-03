import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WatchHistory } from "./entities/watch-history.entity";
import { WatchHistoriesService } from "./watch-histories.service";
import { WatchHistoriesController } from "./watch-histories.controller";

@Module({
  imports: [TypeOrmModule.forFeature([WatchHistory])],
  controllers: [WatchHistoriesController],
  providers: [WatchHistoriesService],
  exports: [WatchHistoriesService],
})
export class WatchHistoriesModule {}
