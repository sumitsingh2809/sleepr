import { AUTH_SERVICE_NAME, AuthServiceClient } from '@app/common';
import { UnauthorizedException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { app } from './app';

export const authContext = async ({ req }) => {
  try {
    // const authClient = app.get<ClientProxy>(AUTH_SERVICE_NAME)
    const authClient = app.get<ClientGrpc>(AUTH_SERVICE_NAME);
    const authService = authClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);

    const user = await lastValueFrom(authService.authenticate({ Authentication: req?.headers?.authentication }));

    return user;
  } catch (err) {
    throw new UnauthorizedException(err);
  }
};
