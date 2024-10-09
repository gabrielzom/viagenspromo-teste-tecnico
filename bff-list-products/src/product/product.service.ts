import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { createPaginator, PaginatedResult } from 'prisma-pagination';
import { ProductFindDto } from './dto/product-find.dto';

@Injectable()
export class ProductService {

  constructor(private readonly prismaClient: PrismaClient) {}

  async find(page: number): Promise<PaginatedResult<ProductFindDto>> {
    return createPaginator({ perPage: 10 })<ProductFindDto, Prisma.ProductFindManyArgs>(
      this.prismaClient.product,
      {},
      { page }
    )
  }

}
