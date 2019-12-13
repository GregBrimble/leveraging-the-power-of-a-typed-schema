import {
  ApolloServer as CloudflareApolloServer,
  gql,
  makeExecutableSchema,
} from 'apollo-server-cloudflare'
import {
  resolvers as helloResolvers,
  typeDefs as helloTypeDefs,
} from './resolvers/hello'
import { merge } from 'lodash'

const query = gql`
  type Query {
    _empty: String
  }
`

const schema = makeExecutableSchema({
  typeDefs: [query, helloTypeDefs],
  resolvers: merge(helloResolvers),
})

let server = new CloudflareApolloServer({
  schema,
  introspection: true,
})

if (process.env.NODE_ENV === `development`) {
  const { ApolloServer } = require(`apollo-server`) // eslint-disable-line @typescript-eslint/no-var-requires
  server = new ApolloServer({
    schema,
    introspection: true,
  })
}

export { server }
