import { gql } from 'apollo-server-cloudflare'

export const typeDefs = gql`
  extend type Query {
    listDemo: [String!]!
  }
`
