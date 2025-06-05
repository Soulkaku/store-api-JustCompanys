import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.sevice';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly jwtService: JwtService;

  async signin(
    params: Prisma.CompanyCreateInput,
  ): Promise<{ access_token: string }> {
    const company = await this.prisma.company.findUnique({
      where: { email: params.email },
    });

    if (!company) {
      throw new NotFoundException('this company dont exist in our database');
    }
    const passwordMatch = await bcrypt.compare(
      params.password,
      company.password,
    );
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: company.id };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
