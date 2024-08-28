import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserDto } from '../dto';

const getCurrentUserByContext = (context: ExecutionContext): UserDto => {
  if (context.getType() === 'http') {
    const req: Request = context.switchToHttp().getRequest();
    return req.user;
  }

  // GraphQl
  const user = context.getArgs()[2]?.req?.headers?.user;
  if (user) {
    return JSON.parse(user);
  }
};

export const currentUser = createParamDecorator((_data: unknown, context: ExecutionContext) =>
  getCurrentUserByContext(context),
);
