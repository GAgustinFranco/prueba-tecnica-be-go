import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({
    example: '64a1b2c3d4e5f6a7b8c9d0e1',
    description: 'ID del usuario que crea la location',
  })
  @IsMongoId({ message: 'user debe ser un ID válido' })
  user: string;

  @ApiProperty({
    example: 'ChIJiRp93iEC0oURvJVqErpVVHw',
    description: 'Place ID de Google Maps para obtener dirección y coordenadas',
  })
  @IsString()
  @IsNotEmpty({ message: 'El place_id es requerido' })
  place_id: string;
}