import { gql } from 'apollo-server-cloudflare'
import { DateTimeResolver, URLResolver, DateTimeMock } from 'graphql-scalars'

export const typeDefs = gql`
  scalar DateTime
  scalar URL

  type Scalars {
    BooleanType: Boolean!
    DateTimeType: DateTime!
    FloatType: Float!
    IDType: ID!
    IntType: Int!
    StringType: String!
    URLType: URL!
  }

  type Types {
    scalars: Scalars!
  }

  type Debug {
    types: Types!
  }

  extend type Query {
    debug: Debug!
  }
`

export const resolvers = {
  DateTime: DateTimeResolver,
  URL: URLResolver,
}

export const mocks = {
  DateTime: DateTimeMock,
  URL: () => new URL('https://gregbrimble.com'), // 'graphql-scalars'.URLMock gives a "URL is not a constructor" error
}
