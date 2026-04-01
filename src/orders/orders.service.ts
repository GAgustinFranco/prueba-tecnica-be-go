import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderDocument> {
    return this.orderModel.create(createOrderDto);
  }

  async findAll(): Promise<any[]> {
    return this.orderModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
          pipeline: [{ $project: { password: 0 } }],
        },
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'trucks',
          localField: 'truck',
          foreignField: '_id',
          as: 'truck',
        },
      },
      { $unwind: { path: '$truck', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'locations',
          localField: 'pickup',
          foreignField: '_id',
          as: 'pickup',
        },
      },
      { $unwind: { path: '$pickup', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'locations',
          localField: 'dropoff',
          foreignField: '_id',
          as: 'dropoff',
        },
      },
      { $unwind: { path: '$dropoff', preserveNullAndEmptyArrays: true } },
      { $sort: { createdAt: -1 } },
    ]);
  }

  async findOne(id: string): Promise<any> {
    const result = await this.orderModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
          pipeline: [{ $project: { password: 0 } }],
        },
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'trucks',
          localField: 'truck',
          foreignField: '_id',
          as: 'truck',
        },
      },
      { $unwind: { path: '$truck', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'locations',
          localField: 'pickup',
          foreignField: '_id',
          as: 'pickup',
        },
      },
      { $unwind: { path: '$pickup', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'locations',
          localField: 'dropoff',
          foreignField: '_id',
          as: 'dropoff',
        },
      },
      { $unwind: { path: '$dropoff', preserveNullAndEmptyArrays: true } },
    ]);

    if (!result.length) throw new NotFoundException('Orden no encontrada');
    return result[0];
  }

  async updateStatus(
    id: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<OrderDocument> {
    const order = await this.orderModel
      .findByIdAndUpdate(id, { status: updateOrderStatusDto.status }, { new: true })
      .populate('user', '-password')
      .populate('truck')
      .populate('pickup')
      .populate('dropoff');
    if (!order) throw new NotFoundException('Orden no encontrada');
    return order;
  }

  async update(id: string, attrs: UpdateOrderDto): Promise<OrderDocument> {
    const order = await this.orderModel
      .findByIdAndUpdate(id, attrs, { new: true })
      .populate('user', '-password')
      .populate('truck')
      .populate('pickup')
      .populate('dropoff');
    if (!order) throw new NotFoundException('Orden no encontrada');
    return order;
  }

  async remove(id: string): Promise<{ message: string }> {
    const order = await this.orderModel.findByIdAndDelete(id);
    if (!order) throw new NotFoundException('Orden no encontrada');
    return { message: 'Orden eliminada correctamente' };
  }
}