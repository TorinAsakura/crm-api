import { Injectable } from '@nestjs/common'
import { Query } from '@nestjs/graphql'
import { SignInService } from '../services'

@Injectable()
export class AuthQueries {
  constructor(
    private readonly signInService: SignInService,
  ) {}

  @Query()
  async signin(request, { email, password }) {
    return this.signInService.signin(email, password)
  }
}
