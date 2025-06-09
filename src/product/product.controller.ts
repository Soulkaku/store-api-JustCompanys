import {
  Body,
  Controller,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'src/database/prisma.sevice';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  @Inject()
  private readonly productService: ProductService;

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createProductDto: CreateProductDto, @Request() req: any) {
    const companyId: number = req.company.sub
    // console.log(req.body);
    // console.log(req.company);

    return this.productService.create(createProductDto, companyId);
  }
}
