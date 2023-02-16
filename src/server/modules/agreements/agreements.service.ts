import { Injectable } from '@nestjs/common'
import { AgreementsQuery } from 'server/modules/agreements/agreements.query'

@Injectable()
export class AgreementsService {
  constructor(private readonly agreementsQuery: AgreementsQuery) {}
  createAgreement(body: any) {
    this.agreementsQuery.createAgreement(body)
  }
}
