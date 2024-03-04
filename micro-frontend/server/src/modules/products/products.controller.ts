import { Controller, Get, Param } from '@nestjs/common';
import products, {Product} from 'src/products';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Get()
  async getProducts() {
    return products;
  }
}
