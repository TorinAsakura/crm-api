import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User, Role, Permission } from '@bloom/users'
import { Resolvers } from './resolvers'
import { Services } from './services'

export * from './middlewares/AuthMiddleware'

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
      Role,
      Permission,
    ]),
  ],
  providers: [
    ...Services,
    ...Resolvers,
  ],
  exports: [
    ...Services,
  ],
})
export class AuthModule {}
