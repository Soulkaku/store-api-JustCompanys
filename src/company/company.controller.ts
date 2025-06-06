import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company as companyModel } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('company')
export class CompanyController {
  @Inject()
  private readonly companyService: CompanyService;

  @UseGuards(AuthGuard)
  @Post('signin')
  async create(
    @Body(new ValidationPipe()) createCompanyDto: CreateCompanyDto,
  ): Promise<companyModel> {
    return this.companyService.create(createCompanyDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getCompany(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Omit<companyModel, 'password'> | null> {
    return this.companyService.companys({ id });
  }
}
