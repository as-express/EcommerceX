import { Test, TestingModule } from '@nestjs/testing';
import { OrderManagmentService } from './order-managment.service';

describe('OrderManagmentService', () => {
  let service: OrderManagmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderManagmentService],
    }).compile();

    service = module.get<OrderManagmentService>(OrderManagmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
