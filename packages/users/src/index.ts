import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UserResolver } from './resolvers/UserResolver'

export * from './entities'

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: process.env.AUTH_SECRET || 'supersecret',
    }),
  ],
  providers: [
    UserResolver,
  ],
})
export class UsersModule {}
