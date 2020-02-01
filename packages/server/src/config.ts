import {
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
import { typeDefs as relayTypeDefs } from './schema/relay'
import {
  typeDefs as contactTypeDefs,
  resolvers as contactResolvers,
  mocks as contactMocks,
} from './schema/user'

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
    relayTypeDefs,
    scalarsTypeDefs,
    // listDemoTypeDefs,
    contactTypeDefs,
  ],
  resolvers: merge(resolvers, scalarsResolvers, contactResolvers),
})

addMockFunctionsToSchema({
  schema,
  mocks: merge(scalarsMocks, contactMocks),
  preserveResolvers: true,
})

export const config = {
  schema,
  introspection: true,
}
