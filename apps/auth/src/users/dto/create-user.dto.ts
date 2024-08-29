import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from 'class-validator';

@InputType()
export class CreateUserDto {
  @IsEmail()
  @Field()
  @ApiProperty({ default: 'john_doe@email.com' })
  email: string;

  @IsStrongPassword()
  @Field()
  @ApiProperty({ default: '$trong_P4ssw0rd' })
  password: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Field(() => [String], { nullable: true })
  roles?: string[];
}
