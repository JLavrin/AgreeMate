import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as process from 'process';

import { AppController } from 'server/modules/app/app.controller';
import { UsersModule } from 'server/modules/users/users.module';
import { AgreementsModule } from 'server/modules/agreements/agreements.module'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: process.cwd(),
      exclude: ['/api* '],
      serveRoot: '',
    }),
    UsersModule,
    AgreementsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
