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
import { AuthRequest } from 'src/auth/interfaces/authRequest.interface';

@Controller('product')
export class ProductController {
  @Inject()
  private readonly productService: ProductService;

  @Post('create')
  @UseGuards(AuthGuard)
  create(
    @Body(new ValidationPipe()) createProductDto: CreateProductDto,
    @Request() req: AuthRequest,
  ) {
    const companyId: number = req.company.sub;

    console.log(req.company);

    return this.productService.create(createProductDto, companyId);
  }

  @Get('/:company')
  @UseGuards(AuthGuard)
  getAllProducts(@Request() req: AuthRequest) {
    const companyId: number = req.company.sub;

    return this.productService.getAll(companyId);
  }

  @Patch('/update/:product')
  @UseGuards(AuthGuard)
  updateOneProduct(
    @Param('product', ParseIntPipe) product: number,
    @Body(new ValidationPipe()) updateProductDto: UpdateProductDto,
    @Request() req: AuthRequest,
  ) {
    return this.productService.updateOne(
      { productId: product, data: updateProductDto },
      req,
    );
  }

  @Delete('delete/:product')
  @UseGuards(AuthGuard)
  deleteProduct(
    @Param('product', ParseIntPipe) product: number,
    @Request() token: AuthRequest,
  ) {
    return this.productService.delete(product, token);
  }
}
