import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

export enum OrderStatus {
  CREATED = 'created',
  IN_TRANSIT = 'in transit',
  COMPLETED = 'completed',
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Truck', required: true })
  truck: Types.ObjectId;

  @Prop({
    type: String,
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  })
  status: OrderStatus;

  @Prop({ type: Types.ObjectId, ref: 'Location', required: true })
  pickup: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Location', required: true })
  dropoff: Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);