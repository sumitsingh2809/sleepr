import { UserDocument } from '@app/common';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { currentUser } from '../../../../libs/common/src/decorators/current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@currentUser() user: UserDocument) {
    return user;
  }
}
