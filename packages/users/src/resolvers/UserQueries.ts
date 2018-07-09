import { Injectable, UseGuards } from '@nestjs/common'
import { Query } from '@nestjs/graphql'
import { AccessGuard, WithAccess } from '@bloom/common'

@Injectable()
@UseGuards(AccessGuard)
export class UserQueries {
  @Query()
  async me(request) {
    return request.user
  }

  @Query()
  @WithAccess('users', 'read')
  async users() {
    return {
      rows: [],
      count: 0,
    }
  }
}
