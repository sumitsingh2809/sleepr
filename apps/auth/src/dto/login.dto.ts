import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ default: 'john_doe@email.com' })
  email: string;

  @IsStrongPassword()
  @ApiProperty({ default: '$trong_P4ssw0rd' })
  password: string;
}
