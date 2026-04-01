import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateTruckDto } from './create-truck.dto';

export class UpdateTruckDto extends PartialType(CreateTruckDto) {
  @ApiPropertyOptional({
    example: '2023',
    description: 'Año del truck',
  })
  year?: string;

  @ApiPropertyOptional({
    example: 'Azul',
    description: 'Color del truck',
  })
  color?: string;

  @ApiPropertyOptional({
    example: 'XYZ789',
    description: 'Placas del truck',
  })
  plates?: string;
}