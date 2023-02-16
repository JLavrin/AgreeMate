import { Module } from '@nestjs/common'
import { DbModule } from 'server/modules/db/db.module'
import { AgreementsQuery } from 'server/modules/agreements/agreements.query'
import { AgreementsService } from 'server/modules/agreements/agreements.service'
import { AgreementsController } from 'server/modules/agreements/agreements.controller'

@Module({
  imports: [DbModule],
  controllers: [AgreementsController],
  providers: [AgreementsQuery, AgreementsService],
})
export class AgreementsModule {}
