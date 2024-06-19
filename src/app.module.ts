import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KitchenService } from './kitchen/kitchen.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, KitchenService],
})
export class AppModule {}
