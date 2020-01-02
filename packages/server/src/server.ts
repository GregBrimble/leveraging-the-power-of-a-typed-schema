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
} from './schema/debug/types/scalars'
import { typeDefs as listDemoTypeDefs } from './schema/debug/lists'
import { typeDefs as connectionsTypeDefs } from './schema/connections'
import {
  typeDefs as contactTypeDefs,
  resolvers as contactResolvers,
} from './schema/contact'

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
  typeDefs: [
    query,
    connectionsTypeDefs,
    scalarsTypeDefs,
    listDemoTypeDefs,
    contactTypeDefs,
  ],
  resolvers: merge(resolvers, scalarsResolvers, contactResolvers),
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
