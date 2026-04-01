import { IsEnum } from 'class-validator';
import { OrderStatus } from '../schemas/order.schema';

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus, {
    message: 'Status debe ser: created, in transit o completed',
  })
  status: OrderStatus;
}