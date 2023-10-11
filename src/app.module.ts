import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloController } from './hello/hello.controller';
import { DataController } from './data/data.controller';

@Module({
  imports: [],
  controllers: [AppController, HelloController, DataController],
  providers: [AppService],
})
export class AppModule {}
