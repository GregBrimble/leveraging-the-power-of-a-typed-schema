import {} from '@cloudflare/workers-types'
import { ApolloServer } from 'apollo-server-cloudflare'
import { config } from './config'
import { graphqlCloudflare } from 'apollo-server-cloudflare/dist/cloudflareApollo'
import { Request as ApolloRequest } from 'apollo-server-env'

const server = new ApolloServer(config)

export const handleRequest = (request: Request): Promise<Response> => {
  const apolloRequest = (request as any) as ApolloRequest
  return graphqlCloudflare(() =>
    server.createGraphQLServerOptions(apolloRequest)
  )(apolloRequest) as Promise<any>
}
