import {} from '@cloudflare/workers-types'
import { server } from './server'
import { graphqlCloudflare } from 'apollo-server-cloudflare/dist/cloudflareApollo'
import { Request as ApolloRequest } from 'apollo-server-env'

export const handleRequest = (request: Request): Promise<Response> => {
  const apolloRequest = (request as any) as ApolloRequest
  return graphqlCloudflare(() =>
    server.createGraphQLServerOptions(apolloRequest)
  )(apolloRequest) as Promise<any>
}
