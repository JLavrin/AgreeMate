import { HttpException } from '@nestjs/common'

export class HttpQueryException extends HttpException {
  constructor(message: string) {
    super(message, 400)
  }
}
