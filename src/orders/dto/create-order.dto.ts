import { IsMongoId, IsOptional, IsEnum } from 'class-validator';
import { OrderStatus } from '../schemas/order.schema';

export class CreateOrderDto {
  @IsMongoId({ message: 'user debe ser un ID válido' })
  user: string;

  @IsMongoId({ message: 'truck debe ser un ID válido' })
  truck: string;

  @IsMongoId({ message: 'pickup debe ser un ID válido' })
  pickup: string;

  @IsMongoId({ message: 'dropoff debe ser un ID válido' })
  dropoff: string;

  @IsOptional()
  @IsEnum(OrderStatus, { message: 'Status inválido' })
  status?: OrderStatus;
}