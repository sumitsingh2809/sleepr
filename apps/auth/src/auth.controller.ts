import { AuthServiceController, AuthServiceControllerMethods, currentUser, UserDocument } from '@app/common';
import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

// @Controller('/auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Get()
//   getHello(): string {
//     return this.authService.getHello();
//   }

//   @UseGuards(LocalAuthGuard)
//   // @UseGuards(AuthGuard('local'))
//   @Post('login')
//   @ApiBody({ type: LoginDto })
//   async login(@currentUser() user: UserDocument, @Res({ passthrough: true }) res: Response) {
//     const jwt = await this.authService.login(user, res);
//     res.send(jwt);
//   }

//   @UseGuards(JwtAuthGuard)
//   @MessagePattern('authenticate')
//   async authenticate(@Payload() data: any) {
//     return data.user;
//   }
// }

@Controller('/auth')
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  // @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@currentUser() user: UserDocument, @Res({ passthrough: true }) res: Response) {
    const jwt = await this.authService.login(user, res);
    res.send(jwt);
  }

  @UseGuards(JwtAuthGuard)
  async authenticate(@Payload() data: any) {
    return {
      ...data.user,
      id: data.user._id,
    };
  }
}
