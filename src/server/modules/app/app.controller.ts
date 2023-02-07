import { Controller, Get } from '@nestjs/common';

import { AppService } from 'server/modules/app/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
