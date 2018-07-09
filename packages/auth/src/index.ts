import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@bloom/users'
import { Resolvers } from './resolvers'
import { Services } from './services'

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: process.env.AUTH_SECRET || 'supersecret',
      signOptions: {
        expiresIn: process.env.AUTH_EXPIRES_IN || '7d',
      },
    }),
    TypeOrmModule.forFeature([
      User,
    ]),
  ],
  providers: [
    ...Services,
    ...Resolvers,
  ],
})
export class AuthModule {}
