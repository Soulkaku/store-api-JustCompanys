import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.sevice';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthRequest } from 'src/auth/interfaces/authRequest.interface';

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

  async updateOne(
    params: {
      productId: number;
      data: Prisma.ProductUpdateInput;
    },
    token: AuthRequest,
  ) {
    const { productId, data } = params;
    const companyTokenId: number = token.company.sub;

    const verifyId = await this.verifyData(companyTokenId, productId);

    if (!verifyId) {
      throw new UnauthorizedException(
        'User does not have permission to update this product',
      );
    }

    return await this.prisma.product.update({ where: { id: productId }, data });
  }

  async delete(product: number, token: AuthRequest) {
    const companyPayloadId: number = token.company.sub;
    console.log(token.company);

    const verifyId = await this.verifyData(companyPayloadId, product);

    if (!verifyId) {
      throw new UnauthorizedException(
        'User does not have permission to delete this product',
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
