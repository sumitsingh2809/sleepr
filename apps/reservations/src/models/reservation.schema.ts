import { AbstractDocument } from '@app/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({ collection: 'reservations', versionKey: false })
export class ReservationDocument extends AbstractDocument {
  @Field()
  @Prop()
  timestamp: Date;

  @Field()
  @Prop()
  startDate: Date;

  @Field()
  @Prop()
  endDate: Date;

  @Field()
  @Prop()
  userId: string;

  @Field()
  @Prop()
  invoiceId: string;
}

export const ReservationSchema = SchemaFactory.createForClass(ReservationDocument);
