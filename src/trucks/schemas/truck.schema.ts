import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TruckDocument = Truck & Document;

@Schema({ timestamps: true })
export class Truck {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true, trim: true })
  year: string;

  @Prop({ required: true, trim: true })
  color: string;

  @Prop({ required: true, trim: true, unique: true, uppercase: true })
  plates: string;
}

export const TruckSchema = SchemaFactory.createForClass(Truck);