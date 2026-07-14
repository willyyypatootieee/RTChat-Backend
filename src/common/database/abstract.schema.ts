import { Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

@Schema()
export class AbstractSchema {
  @Prop({ type: SchemaTypes.ObjectId })
  _id!: Types.ObjectId;
}
