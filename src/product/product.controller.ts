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
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  @Inject()
  private readonly productService: ProductService;

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body(new ValidationPipe()) createProductDto: CreateProductDto,
    @Request() req: any,
  ) {
    const companyId: number = req.company.sub;

    console.log(req.company);

    return this.productService.create(createProductDto, companyId);
  }

  @Get()
  @UseGuards(AuthGuard)
  getAllProducts(@Request() req: any) {
    const companyId: number = req.company.sub;

    return this.productService.getAll(companyId);
  }

  @Delete('delete/:product')
  @UseGuards(AuthGuard)
  deleteProduct(
    @Param('product', ParseIntPipe) product: number,
    @Request() token: any,
  ) {
    return this.productService.delete(product, token);
  }
}
