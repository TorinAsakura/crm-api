import { Query, Resolver } from '@nestjs/graphql'

@Resolver('User')
export class UserResolver {
  @Query()
  async me(request) {
    return request.user
  }
}
