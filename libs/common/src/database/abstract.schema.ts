import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@ObjectType({ isAbstract: true })
@Schema()
export class AbstractDocument {
  @Field(() => String)
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}
