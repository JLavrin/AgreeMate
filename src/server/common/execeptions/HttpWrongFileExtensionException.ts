import { HttpException } from '@nestjs/common'

export class HttpWrongFileExtensionException extends HttpException {
  constructor(message: string) {
    super(message, 400)
  }
}
