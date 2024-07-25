import { CreateChargeDto } from '@app/common/dto/create-charge.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsDefined, IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested } from 'class-validator';

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

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  @ApiProperty()
  charge: CreateChargeDto;
}
