import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as process from 'process';

import { AppController } from 'server/modules/app/app.controller';
import { AppService } from 'server/modules/app/app.service';
import { UsersModule } from 'server/modules/users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: process.cwd(),
      exclude: ['/api* '],
      serveRoot: '',
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
