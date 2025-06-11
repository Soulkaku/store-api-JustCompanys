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

  async getAll(companyId: number) {
    return this.prisma.product.findMany({
      where: {
        companyId: {
          equals: companyId,
        },
      },
    });
  }

  async updateOne(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }) {
    // const { where, data } = params;

    return await this.prisma.product.update(params);
  }

  async delete(where: Prisma.ProductWhereUniqueInput) {
    return this.prisma.product.delete({ where });
  }
}
