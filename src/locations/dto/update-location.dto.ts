import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLocationDto {
  @ApiPropertyOptional({
    example: 'Av. Insurgentes Sur 1234, Ciudad de México',
    description: 'Dirección personalizada de la location',
  })
  @IsOptional()
  @IsString()
  address?: string;
}