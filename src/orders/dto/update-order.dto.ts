import { IsMongoId, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiPropertyOptional({
    example: '64a1b2c3d4e5f6a7b8c9d0e1',
    description: 'Nuevo usuario asignado a la orden',
  })
  @IsOptional()
  @IsMongoId({ message: 'user debe ser un ID válido' })
  user?: string;

  @ApiPropertyOptional({
    example: '64a1b2c3d4e5f6a7b8c9d0e2',
    description: 'Nuevo truck asignado a la orden',
  })
  @IsOptional()
  @IsMongoId({ message: 'truck debe ser un ID válido' })
  truck?: string;

  @ApiPropertyOptional({
    example: '64a1b2c3d4e5f6a7b8c9d0e3',
    description: 'Nueva location de origen (pickup)',
  })
  @IsOptional()
  @IsMongoId({ message: 'pickup debe ser un ID válido' })
  pickup?: string;

  @ApiPropertyOptional({
    example: '64a1b2c3d4e5f6a7b8c9d0e4',
    description: 'Nueva location de destino (dropoff)',
  })
  @IsOptional()
  @IsMongoId({ message: 'dropoff debe ser un ID válido' })
  dropoff?: string;
}