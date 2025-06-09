import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.sevice';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(data: CreateProductDto, companyId: number) {
    const product = { ...data, company: { connect: { id: companyId } } };
    return this.prisma.product.create({
      data: product,
    });
  }

  async getAllProducts(where: Prisma.ProductWhereUniqueInput) {
    return this.prisma.product.findMany({ where });
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }) {
    const { where, data } = params;

    const updatePayload = { ...data };

    return this.prisma.product.update({ where, data: updatePayload });
  }

  async delete(where: Prisma.ProductWhereUniqueInput) {
    return this.prisma.product.delete({ where });
  }
}
