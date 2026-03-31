import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateTruckDto {
  @IsMongoId({ message: 'user debe ser un ID válido' })
  user: string;

  @IsString()
  @IsNotEmpty({ message: 'El año es requerido' })
  year: string;

  @IsString()
  @IsNotEmpty({ message: 'El color es requerido' })
  color: string;

  @IsString()
  @IsNotEmpty({ message: 'Las placas son requeridas' })
  plates: string;
}