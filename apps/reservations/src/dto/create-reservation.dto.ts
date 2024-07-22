import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  placeId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  invoiceId: string;
}
