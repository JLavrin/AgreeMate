import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getServerStatus(): string {
    return 'AgreeMate API is running!'
  }
}
