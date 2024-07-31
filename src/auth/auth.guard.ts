import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AUTH_CONSTANTS } from './auth.constants';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuarg implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      AUTH_CONSTANTS.IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) {
      return true;
    }
    return false;
  }
}
