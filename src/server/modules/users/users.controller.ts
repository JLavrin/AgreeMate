import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { User } from 'shared/types'
import { UsersService } from 'server/modules/users/users.service'
import { HttpQueryException } from 'server/common/execeptions/HttpQueryException'
import ErrorResponseMessage from 'server/dictionaries/ErrorResponseMessage'
import { UserDTO } from 'server/modules/users/dto/UserDTO'
import { PasswordDTO } from 'server/modules/users/dto/PasswordDTO'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService){
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers()
  }

  @Get(':id')
  async getUserById(id: number): Promise<User> {
    return await this.usersService.getUserById(id)
  }

  @Get('/email/:email')
  async getUserByEmail(email: string): Promise<User> {
    return await this.usersService.getUserByEmail(email)
  }

  @Get('/check')
  async checkUserPassword(@Body() body: { email: string, password: string }): Promise<User> {
    return await this.usersService.checkUserPassword(body.email, body.password)
  }

  @Get('/isEmailTaken')
  async isEmailTaken(@Query() query: { email: string }): Promise<boolean> {
    if (!query.email) throw new HttpQueryException(ErrorResponseMessage.EmailRequired)

    return await this.usersService.isEmailTaken(query.email)
  }

  @Get('/isUserValid')
  async isUserValid(@Query() { email, password }: { email: string, password: string }): Promise<boolean> {
    if (!email) throw new HttpQueryException(ErrorResponseMessage.EmailRequired)
    if (!password) throw new HttpQueryException(ErrorResponseMessage.PasswordRequired)

    return await this.usersService.isUserValid(email, password)
  }

  @Post()
  async createUser(@Body() user: UserDTO): Promise<User> {
    return await this.usersService.createUser(user)
  }

  @Put()
  async updateUser(@Body() user: UserDTO): Promise<User> {
    return await this.usersService.updateUser(user)
  }

  @Put('/:id')
  async updatePassword(@Body() passwordDTO: PasswordDTO, @Param('id') id: Pick<User, 'id'> ): Promise<User> {
    return await this.usersService.updatePassword(passwordDTO, id)
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number): Promise<User> {
    return await this.usersService.deleteUser(id)
  }
}
