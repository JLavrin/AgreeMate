import { Injectable } from '@nestjs/common'
import { config } from 'dotenv'
import { Pool } from 'pg'

import { HttpDatabaseException } from 'server/common/execeptions/HttpDatabaseException'

config()
const URL = process.env.DATABASE_URL

@Injectable()
export class DBService {
  private static pool: Pool
  constructor() {
    DBService.pool = new Pool({
      connectionString: URL,
      ssl: { rejectUnauthorized: false }
    })
  }

  async isReady() {
    try {
      await DBService.pool.query('SELECT NOW()')
      return true
    } catch (err) {
      console.error(err)
      throw new HttpDatabaseException(err)
    }
  }

  async queryMany<T>(query: string, params: any[] = []): Promise<T[]> {
    try {
      const response = await DBService.pool.query(query, [...params])

      if (Array.isArray(response?.rows) && response.rows.length > 0) {
        return response.rows
      }

      return null
    } catch (err) {
      console.log(err)
      throw new HttpDatabaseException(err)
    }
  }

  async queryOne<T = any>(query: string, params: any[] = []): Promise<T | null> {
    try {
      const response: { rows: T[] } = await DBService.pool.query(query, [...params])

      if (Array.isArray(response?.rows) && response.rows.length > 0) {
        return response.rows[0]
      }
      return null
    } catch (err) {
      console.log(err)
      throw new HttpDatabaseException(err)
    }
  }
}

