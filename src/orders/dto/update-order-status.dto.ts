import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../schemas/order.schema';

export class UpdateOrderStatusDto {
  @ApiProperty({
    example: 'in transit',
    description: 'Nuevo status de la orden',
    enum: OrderStatus,
  })
  @IsEnum(OrderStatus, {
    message: 'Status debe ser: created, in transit o completed',
  })
  status: OrderStatus;
}