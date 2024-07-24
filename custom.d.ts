import { UserDto } from '@app/common';

declare global {
  namespace Express {
    interface User extends UserDto {}

    interface Request {
      Authentication?: string;
      user?: UserDto;
    }
  }
}

export {};
