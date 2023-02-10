import { DBService } from 'server/modules/db/db.service'
import { HttpDatabaseException } from 'server/common/execeptions/HttpDatabaseException'
import { User } from 'shared/types'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersQuery {
  constructor(private readonly dbService: DBService) {}
  async getUsers(): Promise<User[]> {
    try {
      const users = await this.dbService.queryMany<User>(`
        SELECT
          id,
          (first_name || ' ' || last_name) AS fullname
        FROM users
        ORDER BY id
    `)
      return users
    } catch (e) {
      throw new HttpDatabaseException(e)
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const user = await this.dbService.queryOne<User>(`
        SELECT
          id,
          (first_name || ' ' || last_name) AS fullname
        FROM users
        WHERE id = $1
    `, [id])
      return user
    } catch (e) {
      throw new HttpDatabaseException(e)
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.dbService.queryOne<User>(`
        SELECT
          id,
          (first_name || ' ' || last_name) AS fullname
        FROM users
        WHERE email = $1
    `, [email])
      return user
    } catch (e) {
      throw new HttpDatabaseException(e)
    }
  }

  async checkUserPassword(email: string, password: string): Promise<User> {
    try {
      const user = await this.dbService.queryOne<User>(`
        SELECT
          id,
          (first_name || ' ' || last_name) AS fullname
        FROM users
        WHERE email = $1 AND password = crypt($2, gen_salt('bf'))
    `, [email, password])
      return user
    } catch (e) {
      throw new HttpDatabaseException(e)
    }
  }

  async createUser(user: Partial<User>): Promise<User> {
    try {
      const newUser = await this.dbService.queryOne<User>(`
        INSERT INTO users (first_name, last_name, email, password)
        VALUES ($1, $2, $3, crypt($4, gen_salt('bf')))
        RETURNING id, (first_name || ' ' || last_name) AS fullname
    `, [user.firstName, user.lastName, user.email, user.password])
      return newUser
    } catch (e) {
      console.log(e)
      throw new HttpDatabaseException(e)
    }
  }

  async updateUser(user: Partial<User>): Promise<User> {
    try {
      const updatedUser = await this.dbService.queryOne<User>(`
        UPDATE users
        SET first_name = $1, last_name = $2, email = $3
        WHERE id = ${user.id}
        RETURNING id, (first_name || ' ' || last_name) AS fullname
    `, [user.firstName, user.lastName, user.email])
      return updatedUser
    } catch (e) {
      throw new HttpDatabaseException(e)
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      const deletedUser = await this.dbService.queryOne<User>(`
        DELETE FROM users
        WHERE id = $1
        RETURNING id, (first_name || ' ' || last_name) AS fullname
    `, [id])
      return deletedUser
    } catch (e) {
      throw new HttpDatabaseException(e)
    }
  }

  async changePassword(password: Pick<User, 'password'>, id: Pick<User, 'id'>): Promise<User> {
    try {
      const updatedUser = await this.dbService.queryOne<User>(`
        UPDATE users
        SET password = crypt('${password}', gen_salt('bf'))
        WHERE id = $1
        RETURNING id, (first_name || ' ' || last_name) AS fullname
    `, [id])
      return updatedUser
    } catch (e) {
      throw new HttpDatabaseException(e)
    }
  }
}
