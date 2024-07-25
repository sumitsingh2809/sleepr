import { ApiProperty } from '@nestjs/swagger';
import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CardDto {
  @IsCreditCard()
  @IsNotEmpty()
  @ApiProperty({ default: '4242 4242 4242 4242' })
  number: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: 12 })
  exp_month: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: 2034 })
  exp_year: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: '567' })
  cvc: string;
}
