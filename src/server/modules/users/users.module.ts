import { Module } from '@nestjs/common'
import { UsersController } from 'server/modules/users/users.controller'
import { UsersService } from 'server/modules/users/users.service'
import { DbModule } from 'server/modules/db/db.module'
import { UsersQuery } from 'server/modules/users/users.query'

@Module({
  imports: [DbModule],
  providers: [UsersService, UsersQuery],
  controllers: [UsersController],
})
export class UsersModule {}
