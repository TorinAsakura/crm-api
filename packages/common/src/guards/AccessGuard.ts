import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AccessDeniedException } from '../exceptions/AccessDeniedException'
import { UnauthorizedException } from '../exceptions/UnauthorizedException'

interface WithAccessParams {
  resource: string
  action: string
  possession?: string
}

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const withAccess = this.reflector.get<WithAccessParams>('withAccess', context.getHandler())

    if (!withAccess) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()

    if (!user) {
      throw new UnauthorizedException()
    }

    const permission = user.getAccessControl().permission({
      role: 'USER_PERMISSIONS',
      action: withAccess.action,
      resource: withAccess.resource,
      possession: withAccess.possession || 'any',
    })

    if (!permission.granted) {
      throw new AccessDeniedException()
    }

    return true
  }
}
