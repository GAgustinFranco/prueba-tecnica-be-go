import { IsMongoId, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '../schemas/order.schema';

export class CreateOrderDto {
  @ApiProperty({
    example: '64a1b2c3d4e5f6a7b8c9d0e1',
    description: 'ID del usuario que crea la orden',
  })
  @IsMongoId({ message: 'user debe ser un ID válido' })
  user: string;

  @ApiProperty({
    example: '64a1b2c3d4e5f6a7b8c9d0e2',
    description: 'ID del truck asignado a la orden',
  })
  @IsMongoId({ message: 'truck debe ser un ID válido' })
  truck: string;

  @ApiProperty({
    example: '64a1b2c3d4e5f6a7b8c9d0e3',
    description: 'ID de la location de origen (pickup)',
  })
  @IsMongoId({ message: 'pickup debe ser un ID válido' })
  pickup: string;

  @ApiProperty({
    example: '64a1b2c3d4e5f6a7b8c9d0e4',
    description: 'ID de la location de destino (dropoff)',
  })
  @IsMongoId({ message: 'dropoff debe ser un ID válido' })
  dropoff: string;

  @ApiPropertyOptional({
    example: 'created',
    description: 'Status inicial de la orden',
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  })
  @IsOptional()
  @IsEnum(OrderStatus, { message: 'Status inválido' })
  status?: OrderStatus;
}