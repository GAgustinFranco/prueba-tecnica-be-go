import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateLocationDto {
  @IsMongoId({ message: 'user debe ser un ID válido' })
  user: string;

  @IsString()
  @IsNotEmpty({ message: 'El place_id es requerido' })
  place_id: string;
}