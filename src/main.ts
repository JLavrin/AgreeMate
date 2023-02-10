import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'
import { config } from 'dotenv'

import { AppModule } from 'server/modules/app/app.module';
import { DBService } from 'server/modules/db/db.service'
import * as process from 'process'

config()
const PORT = process.env.PORT || 3000


async function bootstrap() {
  const db = new DBService()
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe())


  await app.listen(PORT);

  const dbStatus = await db.isReady()
  console.log(`Database ${dbStatus ? 'on air' : 'fucked up'}`)
}
try {
  bootstrap();
} catch (err) {
  console.error(err)
  process.exit(1)
}
