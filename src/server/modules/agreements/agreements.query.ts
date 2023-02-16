import { Injectable } from '@nestjs/common'
import { DBService } from 'server/modules/db/db.service'
import { HttpDatabaseException } from 'server/common/execeptions/HttpDatabaseException'

@Injectable()
export class AgreementsQuery {
  constructor(private readonly dbService: DBService) {

  }

  async createAgreement(body: any) {
    try {
      const result = await this.dbService.queryOne(`
      INSERT INTO agreements (shortname, file)
      VALUES ($1, $2)
      RETURNING id
    `, [body.name, body.file])

      return result
    } catch (error) {
      throw new HttpDatabaseException(error)
    }
  }
}
