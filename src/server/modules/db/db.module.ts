import { Module } from '@nestjs/common'

import { DBService } from 'server/modules/db/db.service'

@Module({
  providers: [DBService],
  exports: [DBService]
})
export class DbModule {}
