import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as timespan from 'jsonwebtoken/lib/timespan'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { User } from '@bloom/users'
import messages from '../messages'

@Injectable()
export class SignInService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signin(email, password) {
    const user = await this.userRepository
     .createQueryBuilder('user')
     .where('LOWER(email) = LOWER(:email)', { email })
     .getOne()

    if (!user || !await bcrypt.compare(password, user.password)) {
      return {
        errors: {
          email: messages.invalidEmailOrPassword,
        },
      }
    }

    const token = this.jwtService.sign({ id: user.id })

    return {
      token: {
        expiresIn: timespan(process.env.AUTH_EXPIRES_IN || '7d'),
        email: user.email,
        token,
      },
    }
  }
}
