import { Injectable } from '@nestjs/common'
import { User } from 'shared/types'
import { UsersQuery } from 'server/modules/users/users.query'
import { HttpQueryException } from 'server/common/execeptions/HttpQueryException'
import ErrorResponseMessage from 'server/dictionaries/ErrorResponseMessage'

@Injectable()
export class UsersService {
  constructor(private readonly usersQuery: UsersQuery) {
  }

  async getUsers(): Promise<User[]> {
    return this.usersQuery.getUsers()
  }

  async getUserById(id: number): Promise<User> {
    return this.usersQuery.getUserById(id)
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.usersQuery.getUserByEmail(email)
  }

  async checkUserPassword(email: string, password: string): Promise<User> {
    return this.usersQuery.checkUserPassword(email, password)
  }

  async isEmailTaken(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email)
    return !!user
  }

  async isUserValid(email: string, password: string): Promise<boolean> {
    const user = await this.checkUserPassword(email, password)
    return !!user
  }

  async createUser(user: Partial<User>): Promise<User> {
    if (await this.isEmailTaken(user.email)) {
      throw new HttpQueryException(ErrorResponseMessage.EmailTaken)
    }

    return this.usersQuery.createUser(user)
  }

  async updateUser(user: Partial<User>): Promise<User> {
    return this.usersQuery.updateUser(user)
  }

  async deleteUser(id: number): Promise<User> {
    return this.usersQuery.deleteUser(id)
  }

  async updatePassword(password: Pick<User, 'password'>, id: Pick<User, 'id'>): Promise<User> {
    return this.usersQuery.changePassword(password, id)
  }

}
