import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from 'src/payments/dto/CreatePayment.dto';

@Injectable()
export class PaymentsService {
  private users = [
    {
      email: 'a@a',
    },
    {
      email: 'b@b',
    },
  ];

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { email } = createPaymentDto;
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return {
      id: 1,
      name: 'Payment',
    };
  }
}
