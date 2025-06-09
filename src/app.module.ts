import { Module, ValidationPipe } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { APP_PIPE } from '@nestjs/core';
import { ProductModule } from './product/product.module';

@Module({
  imports: [DatabaseModule, AuthModule, CompanyModule, ProductModule],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
