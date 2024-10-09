import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaClient],
})
export class ProductModule {}
