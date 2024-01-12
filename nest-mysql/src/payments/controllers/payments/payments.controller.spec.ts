import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from '../../services/payments/payments.service';
import { BadRequestException } from '@nestjs/common';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentsService: PaymentsService;
  const responseMock = {
    status: jest.fn(() => statusMock),
    send: jest.fn((x) => x),
  } as any;

  const statusMock = {
    send: jest.fn((x) => x),
  } as any;

  const requestMock = {
    query: {},
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: 'PAYMENTS_SERVICE',
          useValue: {
            createPayment: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    paymentsService = module.get<PaymentsService>('PAYMENTS_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('payment service should be defined', () => {
    expect(paymentsService).toBeDefined();
  });

  describe('getPayments', () => {
    it('should return 400', () => {
      controller.getPayments(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusMock.send).toHaveBeenCalledWith('Missing count or page');
    });
    it('should return 200', () => {
      requestMock.query = { count: 10, page: 1 };
      controller.getPayments(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(200);
    });
  });

  describe('createPayment', () => {
    it('should return payment', async () => {
      const payment = await controller.createPayment({
        email: 'a@a',
        price: 100,
      });
      expect(payment).toEqual({
        email: 'a@a',
        price: 100,
      });
    });

    it('should throw error', async () => {
      jest.spyOn(paymentsService, 'createPayment').mockImplementation(() => {
        throw new BadRequestException();
      });
      try {
        await controller.createPayment({
          email: 'a@a',
          price: 100,
        });
      } catch (e) {
        console.log(e);
      }
    });
  });
});
