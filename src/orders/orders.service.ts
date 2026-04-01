import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderDocument> {
    return this.orderModel.create(createOrderDto);
  }

  async findAll(): Promise<OrderDocument[]> {
    return this.orderModel
      .find()
      .populate('user', '-password')
      .populate('truck')
      .populate('pickup')
      .populate('dropoff');
  }

  async findOne(id: string): Promise<OrderDocument> {
    const order = await this.orderModel
      .findById(id)
      .populate('user', '-password')
      .populate('truck')
      .populate('pickup')
      .populate('dropoff');
    if (!order) throw new NotFoundException('Orden no encontrada');
    return order;
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

  async update(id: string, attrs: Partial<CreateOrderDto>): Promise<OrderDocument> {
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