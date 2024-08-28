import { CreateChargeDto } from '@app/common/dto/create-charge.dto';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsDefined, IsNotEmptyObject, ValidateNested } from 'class-validator';

@InputType()
export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  @Field()
  @ApiProperty()
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  @Field()
  @ApiProperty()
  endDate: Date;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  @Field(() => CreateChargeDto)
  @ApiProperty()
  charge: CreateChargeDto;
}
