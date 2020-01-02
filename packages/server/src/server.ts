import {
  ApolloServer as CloudflareApolloServer,
  gql,
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'apollo-server-cloudflare'
import { merge } from 'lodash'
import {
  typeDefs as scalarsTypeDefs,
  resolvers as scalarsResolvers,
  mocks as scalarsMocks,
} from './resolvers/debug/types/scalars'

const query = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => `Hello, world!`,
  },
}

const schema = makeExecutableSchema({
  typeDefs: [query, scalarsTypeDefs],
  resolvers: merge(resolvers, scalarsResolvers),
})

addMockFunctionsToSchema({
  schema,
  mocks: merge(scalarsMocks),
  preserveResolvers: true,
})

const config = {
  schema,
  introspection: true,
}

let server = new CloudflareApolloServer(config)

if (process.env.NODE_ENV === `development`) {
  const { ApolloServer } = require(`apollo-server`) // eslint-disable-line @typescript-eslint/no-var-requires
  server = new ApolloServer(config)
}

export { server }
