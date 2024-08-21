import { CanActivate, ExecutionContext, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants';
import { UserDto } from '../dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const jwt = req.cookies?.Authentication || req.headers?.authorization;

    if (!jwt) {
      return false;
    }

    const roles = this.reflector.get('roles', context.getHandler()) || [];

    return this.authClient.send<UserDto>('authenticate', { Authentication: jwt }).pipe(
      tap((res) => {
        for (const role of roles) {
          if (!res.roles?.includes(role)) {
            this.logger.error('user does not have valid roles');
            throw new UnauthorizedException();
          }
        }
        req.user = res;
      }),
      map(() => true),
      catchError((err) => {
        this.logger.error(err);
        return of(false);
      }),
    );
  }
}
