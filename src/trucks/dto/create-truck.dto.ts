import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTruckDto {
  @ApiProperty({
    example: '64a1b2c3d4e5f6a7b8c9d0e1',
    description: 'ID del usuario propietario del truck',
  })
  @IsMongoId({ message: 'user debe ser un ID válido' })
  user: string;

  @ApiProperty({
    example: '2022',
    description: 'Año del truck',
  })
  @IsString()
  @IsNotEmpty({ message: 'El año es requerido' })
  year: string;

  @ApiProperty({
    example: 'Rojo',
    description: 'Color del truck',
  })
  @IsString()
  @IsNotEmpty({ message: 'El color es requerido' })
  color: string;

  @ApiProperty({
    example: 'ABC123',
    description: 'Placas del truck (únicas)',
  })
  @IsString()
  @IsNotEmpty({ message: 'Las placas son requeridas' })
  plates: string;
}