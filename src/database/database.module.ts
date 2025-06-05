import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.sevice';

@Module({})
export class DatabaseModule {
  providers: [PrismaService];
  exports: [PrismaService];
}
