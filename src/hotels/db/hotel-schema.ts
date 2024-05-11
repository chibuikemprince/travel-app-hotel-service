import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HotelDocument = Hotel & Document;

@Schema()
export class Hotel {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  available: boolean;

  @Prop({ required: true })
  userEmail: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
