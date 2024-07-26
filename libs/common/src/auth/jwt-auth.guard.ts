import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants';
import { UserDto } from '../dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const jwt = req.cookies?.Authentication;

    if (!jwt) {
      return false;
    }

    return this.authClient.send<UserDto>('authenticate', { Authentication: jwt }).pipe(
      tap((res) => (req.user = res)),
      map(() => true),
      catchError(() => of(false)),
    );
  }
}
