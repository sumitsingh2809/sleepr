import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CardDto {
  @IsCreditCard()
  @IsNotEmpty()
  @Field()
  @ApiProperty({ default: '4242 4242 4242 4242' })
  number: string;

  @IsNumber()
  @IsNotEmpty()
  @Field()
  @ApiProperty({ default: 12 })
  exp_month: number;

  @IsNumber()
  @IsNotEmpty()
  @Field()
  @ApiProperty({ default: 2034 })
  exp_year: number;

  @IsString()
  @IsNotEmpty()
  @Field()
  @ApiProperty({ default: '567' })
  cvc: string;
}
