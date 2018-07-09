import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { Resolvers } from './resolvers'

export * from './entities'

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: process.env.AUTH_SECRET || 'supersecret',
    }),
  ],
  providers: [
    ...Resolvers,
  ],
})
export class UsersModule {}
