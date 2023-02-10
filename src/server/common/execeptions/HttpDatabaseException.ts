import { HttpException } from '@nestjs/common'

export class HttpDatabaseException extends HttpException {
  constructor(error) {
    super(error, 500)
  }
}
