import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientGrpc } from '@nestjs/microservices';
import { Request } from 'express';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AUTH_SERVICE_NAME, AuthServiceClient } from '../types';

// @Injectable()
// export class JwtAuthGuard implements CanActivate {
//   private readonly logger = new Logger(JwtAuthGuard.name);

//   constructor(
//     @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
//     private readonly reflector: Reflector,
//   ) {}

//   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//     const req: Request = context.switchToHttp().getRequest();
//     const jwt = req.cookies?.Authentication || req.headers?.authorization;

//     if (!jwt) {
//       return false;
//     }

//     const roles = this.reflector.get('roles', context.getHandler()) || [];

//     return this.authClient.send<UserDto>('authenticate', { Authentication: jwt }).pipe(
//       tap((res) => {
//         for (const role of roles) {
//           if (!res.roles?.includes(role)) {
//             this.logger.error('user does not have valid roles');
//             throw new UnauthorizedException();
//           }
//         }
//         req.user = res;
//       }),
//       map(() => true),
//       catchError((err) => {
//         this.logger.error(err);
//         return of(false);
//       }),
//     );
//   }
// }

@Injectable()
export class JwtAuthGuard implements CanActivate, OnModuleInit {
  private readonly logger = new Logger(JwtAuthGuard.name);
  private authService: AuthServiceClient;

  constructor(
    @Inject(AUTH_SERVICE_NAME) private readonly client: ClientGrpc,
    private readonly reflector: Reflector,
  ) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const jwt = req.cookies?.Authentication || req.headers?.authorization;

    if (!jwt) {
      return false;
    }

    const roles = this.reflector.get('roles', context.getHandler()) || [];

    return this.authService.authenticate({ Authentication: jwt }).pipe(
      tap((res) => {
        for (const role of roles) {
          if (!res.roles?.includes(role)) {
            this.logger.error('user does not have valid roles');
            throw new UnauthorizedException();
          }
        }
        req.user = { ...res, _id: res.id };
      }),
      map(() => true),
      catchError((err) => {
        this.logger.error(err);
        return of(false);
      }),
    );
  }
}
