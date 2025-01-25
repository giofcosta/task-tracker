import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Boolean, default: false })
  completed: boolean;

  @Prop({ type: Date })
  dueDate: Date;

  @Prop({ type: Number })
  hours: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);