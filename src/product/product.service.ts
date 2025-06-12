import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.sevice';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(data: CreateProductDto, companyId: number): Promise<Product> {
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

  // async updateOne(
  //   params: {
  //     where: Prisma.ProductWhereUniqueInput;
  //     data: Prisma.ProductUpdateInput;
  //   },
  //   token: any,
  // ) {
  //   const companyPayloadId: number = token.company.sub;
  //   const { data, where } = params;

  //   const verifyId = await this.verifyData(companyPayloadId, where);

  //   if (!verifyId) {
  //     throw new UnauthorizedException(
  //       'User dont have permission to update this product',
  //     );
  //   }

  //   return await this.prisma.product.update(params);
  // }

  async delete(product: number, token: any) {
    const companyPayloadId: number = token.company.sub;
    console.log(companyPayloadId);

    const verifyId = await this.verifyData(companyPayloadId, product);

    if (!verifyId) {
      throw new UnauthorizedException(
        'User dont have permission to delete this product',
      );
    }

    return this.prisma.product.delete({ where: { id: product } });
  }

  private async verifyData(companyTokenId: number, product: number) {
    const companyFromProduct = (await this.getOne({ id: product }))?.companyId;

    if (companyFromProduct !== companyTokenId) {
      // throw new ForbiddenException('the IDs are not the same');
      return false;
    }

    return true;
  }
}
