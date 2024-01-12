import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentsService } from '../../services/payments/payments.service';
import { CreatePaymentDto } from '../../dto/CreatePayment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(
    @Inject('PAYMENTS_SERVICE')
    private readonly paymentsService: PaymentsService,
  ) {}

  @Get()
  getPayments(@Req() request: Request, @Res() response: Response) {
    const { count, page } = request.query;
    if (!count || !page) {
      response.status(400).send('Missing count or page');
    } else {
      response.status(200).send(`Payments: ${count} ${page}`);
    }
    return 'Payments';
  }

  @Post()
  async createPayment(@Body() createPayment: CreatePaymentDto) {
    const payment = await this.paymentsService.createPayment(createPayment);
    return payment;
  }
}
