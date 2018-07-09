import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql'
import { UsersModule } from '@bloom/users'
import { AuthModule, AuthMiddleware } from '@bloom/auth'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'db',
      database: process.env.DB_NAME || 'bloom',
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root',
      entities: [
        '../**/src/**/entities/**.ts'
      ],
      migrations: [
        '../**/migrations/**.ts',
      ],
      migrationsRun: true,
      synchronize: false,
      logging: false,
    }),
    GraphQLModule,
    AuthModule,
    UsersModule,
  ],
})
export class ApplicationModule implements NestModule {
  constructor(
    private readonly graphQLFactory: GraphQLFactory,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const schema = this.graphQLFactory.createSchema({
      typeDefs: this.graphQLFactory.mergeTypesByPaths('../../**/*.graphql'),
      resolverValidationOptions: {
        allowResolversNotInSchema: true,
      },
    })

    consumer
      .apply(graphiqlExpress({ endpointURL: '/' }))
        .forRoutes('/graphiql')
      .apply(AuthMiddleware)
        .forRoutes('/')
      .apply(graphqlExpress((request) => ({ schema, rootValue: request })))
        .forRoutes('/')
  }
}
