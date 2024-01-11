import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';

describe('PaymentsController', () => {
  let controller: PaymentsController;
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
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
});
