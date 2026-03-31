import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrucksService } from './trucks.service';
import { TrucksController } from './trucks.controller';
import { Truck, TruckSchema } from './schemas/truck.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Truck.name, schema: TruckSchema }]),
    AuthModule,
  ],
  controllers: [TrucksController],
  providers: [TrucksService],
})
export class TrucksModule {}