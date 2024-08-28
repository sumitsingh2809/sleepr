import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, ValidateNested } from 'class-validator';
import { CardDto } from './card.dto';

@InputType()
export class CreateChargeDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDto)
  @Field(() => CardDto)
  @ApiProperty()
  card: CardDto;

  @IsNumber()
  @IsNotEmpty()
  @Field()
  @ApiProperty({ default: 5 })
  amount: number;
}
