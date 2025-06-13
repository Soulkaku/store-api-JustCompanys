import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company as companyModel } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  @Inject()
  private readonly companyService: CompanyService;

  @Post('signup')
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

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateCompany(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update({
      where: { id },
      data: updateCompanyDto,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteCompany(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.delete({ id });
  }
}
