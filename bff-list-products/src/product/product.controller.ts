import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

  constructor(private readonly productService: ProductService) {}

  @Get()
  async find(@Query('page') page: number = 1) {
    return await this.productService.find(page)
  }
}
