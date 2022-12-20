import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum GenderTypes {
  MALE,
  FEMALE,
}

export type EmployeeDocument = Employee & Document;

@Schema({
  toJSON: {
    transform(doc, ret, options) {
      delete ret._v;
      delete ret.created_at;
      delete ret.updated_at;
    },
  },
})
export class Employee {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  gender: GenderTypes;

  @Prop()
  picture: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
