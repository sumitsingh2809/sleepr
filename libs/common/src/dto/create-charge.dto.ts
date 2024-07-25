import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, ValidateNested } from 'class-validator';
import { CardDto } from './card.dto';

export class CreateChargeDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDto)
  @ApiProperty()
  card: CardDto;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: 5 })
  amount: number;
}
