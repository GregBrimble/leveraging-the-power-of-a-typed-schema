import { gql } from 'apollo-server-cloudflare'
import { DateTimeResolver, URLResolver, DateTimeMock } from 'graphql-scalars'

export const typeDefs = gql`
  type ListDemo {
    items: [String!]!
  }

  extend type Query {
    whatever: ListDemo!
  }
`
