import { gql } from 'apollo-server-cloudflare'

const typeDefs = gql`
  extend type Query {
    hello: String!
  }
`

const hello = (): string => `Hello, world!`

const resolvers = {
  Query: {
    hello,
  },
}

export { typeDefs, resolvers }
