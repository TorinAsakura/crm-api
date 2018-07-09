import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as timespan from 'jsonwebtoken/lib/timespan'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { User } from '@bloom/users'
import messages from '../messages'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async verify(token) {
    const payload: any = this.jwtService.verify(token)

    if (!payload) {
      return null
    }

    return await this.userRepository.findOne({
      where: { id: payload.id },
      relations: [
        'permissions',
        'role',
        'role.permissions',
      ],
    })
  }
}
