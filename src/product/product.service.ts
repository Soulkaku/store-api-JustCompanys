import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.sevice';
import { CreateProductDto } from './dto/create-product.dto';
import { error } from 'console';

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

  async getOne(
    product: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    return await this.prisma.product.findUnique({ where: product });
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

  async delete(product: number, token: any) {
    const companyPayloadId = token.company.sub;
    console.log(companyPayloadId);

    const companyFromProduct = (await this.getOne({ id: product }))?.companyId;

    if (companyFromProduct !== companyPayloadId) {
      throw new ForbiddenException('the IDs are not the same');
    }

    return this.prisma.product.delete({ where: { id: product } });
  }
}
