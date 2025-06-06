import { PrismaService } from 'src/database/prisma.sevice';
import { Company, Prisma } from '@prisma/client';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CompanyService {
  @Inject()
  private readonly prisma: PrismaService;

  async companys(
    CompanyWhereUniqueInput: Prisma.CompanyWhereUniqueInput,
  ): Promise<Omit<Company, 'password'> | null> {
    return this.prisma.company.findUnique({
      where: CompanyWhereUniqueInput,
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });
  }

  async create(data: Prisma.CompanyCreateInput) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    console.log(data);

    return this.prisma.company.create({
      data: { ...data, password: hashPassword },
    });
  }
}
