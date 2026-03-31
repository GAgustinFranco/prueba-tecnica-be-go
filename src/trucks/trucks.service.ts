import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Truck, TruckDocument } from './schemas/truck.schema';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';

@Injectable()
export class TrucksService {
  constructor(
    @InjectModel(Truck.name) private truckModel: Model<TruckDocument>,
  ) {}

  async create(createTruckDto: CreateTruckDto): Promise<TruckDocument> {
    return this.truckModel.create(createTruckDto);
  }

  async findAll(): Promise<TruckDocument[]> {
    return this.truckModel.find().populate('user', '-password');
  }

  async findOne(id: string): Promise<TruckDocument> {
    const truck = await this.truckModel
      .findById(id)
      .populate('user', '-password');
    if (!truck) throw new NotFoundException('Truck no encontrado');
    return truck;
  }

  async update(id: string, updateTruckDto: UpdateTruckDto): Promise<TruckDocument> {
    const truck = await this.truckModel
      .findByIdAndUpdate(id, updateTruckDto, { new: true })
      .populate('user', '-password');
    if (!truck) throw new NotFoundException('Truck no encontrado');
    return truck;
  }

  async remove(id: string): Promise<{ message: string }> {
    const truck = await this.truckModel.findByIdAndDelete(id);
    if (!truck) throw new NotFoundException('Truck no encontrado');
    return { message: 'Truck eliminado correctamente' };
  }
}