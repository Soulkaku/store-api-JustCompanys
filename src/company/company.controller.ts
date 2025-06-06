import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company as companyModel } from '@prisma/client';

@Controller('company')
export class CompanyController {
  @Inject()
  private readonly companyService: CompanyService;

  @Post('signin')
  async create(
    @Body(new ValidationPipe()) createCompanyDto: CreateCompanyDto,
  ): Promise<companyModel> {
    return this.companyService.create(createCompanyDto);
  }

  @Get(':id')
  async getCompany(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<companyModel | null> {
    return this.companyService.companys({ id });
  }
}
