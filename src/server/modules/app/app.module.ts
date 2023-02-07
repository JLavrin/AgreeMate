import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as process from 'process'

import { AppController } from 'server/modules/app/app.controller';
import { AppService } from 'server/modules/app/app.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: process.cwd(),
      exclude: ['/api* '],
      // serveRoot not api
      serveRoot: '',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
