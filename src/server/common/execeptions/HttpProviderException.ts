import { HttpException } from '@nestjs/common'

export class HttpProviderException extends HttpException {
	constructor() {
		super('HttpProviderException', 500)
	}
}
