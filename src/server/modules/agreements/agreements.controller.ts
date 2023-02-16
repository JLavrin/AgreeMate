import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query, Req } from '@nestjs/common'
import { HttpWrongFileExtensionException } from 'server/common/execeptions/HttpWrongFileExtensionException'
import { HttpMissingRequiredElementException } from 'server/common/execeptions/HttpMissingRequiredElementException'
import { AgreementsService } from 'server/modules/agreements/agreements.service'

@Controller('agreements')
export class AgreementsController {
  constructor(private readonly agreementsService: AgreementsService) {}

  @Get()
  async getAgreements() {
    return 'TODO'
  }

  @Get(':id')
  async getAgreementById(@Param('id') id: string) {
    return 'TODO'
  }

  @Get('client/:id')
  async getAgreementsByClientId(@Param('client') clientId: string) {
     return 'TODO'
  }

  @Get('fields')
  async getAgreementFields() {
    return 'TODO'
  }

  @Put(':id')
  async updateAgreement() {
    return 'TODO'
  }

  @Put('fields')
  async updateAgreementFields() {
    return 'TODO'
  }

  @Post()
  async createAgreement(@Req() req, @Body() body: any) {
    return req.body
    if (!body.file) {
      throw new HttpMissingRequiredElementException('Plik .docx jest wymagany')
    }

    if (!body.name) {
      throw new HttpMissingRequiredElementException('Nazwa jest wymagana')
    }

    return this.agreementsService.createAgreement(body)
  }

  @Post('fields')
  async createAgreementFields() {
    return 'TODO'
  }

  @Delete(':id')
  async deleteAgreement() {
    return 'TODO'
  }

  @Delete('fields')
  async deleteAgreementFields() {
    return 'TODO'
  }
}
