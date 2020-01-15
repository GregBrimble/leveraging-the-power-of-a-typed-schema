import { gql } from 'apollo-server-cloudflare'
import {
  connectionFromArray,
  cursorToOffset,
  ConnectionArguments,
  offsetToCursor,
} from 'graphql-relay'

export const typeDefs = gql`
  interface Node {
    id: ID!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String!
    endCursor: String!
  }
`

const DEFAULT_PAGE_SIZE = 5

export const paginate = (edges, args: ConnectionArguments) => {
  if (args.before !== undefined && args.last === undefined)
    args.last = DEFAULT_PAGE_SIZE
  else if (args.first === undefined) args.first = DEFAULT_PAGE_SIZE

  const resp = connectionFromArray(edges, args)

  // The relay spec is insane, and doesn't support `hasPreviousPage` when paginating forward, and vice versa with `hasNextPage`, backwards: https://github.com/graphql/graphql-relay-js/issues/58
  resp.pageInfo.startCursor = resp.pageInfo.startCursor || offsetToCursor(0)
  resp.pageInfo.endCursor = resp.pageInfo.endCursor || offsetToCursor(0)
  resp.pageInfo.hasPreviousPage = cursorToOffset(resp.pageInfo.startCursor) > 0
  resp.pageInfo.hasNextPage =
    cursorToOffset(resp.pageInfo.endCursor) < edges.length - 1

  return resp
}
