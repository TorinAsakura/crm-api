import { Injectable, NestMiddleware } from '@nestjs/common'
import { AuthService } from '../services'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
  ) {}

  resolve(userQueries: any) {
    return async (req, res, next) => {
      const token = req.headers.authorization

      if (!token) {
        return next()
      }

      try {
        const user = await this.authService.verify(token)

        if (user) {
          req.user = user
        }
      } catch (error) {
        console.log(error) // tslint:disable-line:no-console
      }

      return next()
    }
 }
}
