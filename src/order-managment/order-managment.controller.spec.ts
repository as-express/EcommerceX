import { Test, TestingModule } from '@nestjs/testing';
import { OrderManagmentController } from './order-managment.controller';
import { OrderManagmentService } from './order-managment.service';

describe('OrderManagmentController', () => {
    let controller: OrderManagmentController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrderManagmentController],
            providers: [OrderManagmentService],
        }).compile();

        controller = module.get<OrderManagmentController>(OrderManagmentController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
