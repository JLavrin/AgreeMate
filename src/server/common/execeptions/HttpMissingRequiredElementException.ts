import { HttpException } from '@nestjs/common'

export class HttpMissingRequiredElementException extends HttpException {
  constructor(message: string) {
    super(message, 400)
  }
}
