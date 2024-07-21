import { Controller, Get, Param } from '@nestjs/common';

@Controller('coffee')
export class CoffeeController {
  @Get(':id')
  findOne(@Param('id') id: string) {
    return id;
  }
}
