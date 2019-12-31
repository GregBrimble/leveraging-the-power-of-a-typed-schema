import { gql } from 'apollo-server-cloudflare'
import * as faker from 'faker'

faker.seed(1)

const generateContact = () => ({
  id: faker.random.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  url: faker.internet.url(),
})

const MAX_EDGES = 30
const edges = []
for (let i = 0; i < MAX_EDGES; i++) {
  edges.push({
    node: generateContact(),
    cursor: i,
  })
}

export const typeDefs = gql`
  type Contact implements Node {
    id: ID!
    firstName: String!
    lastName: String!
    url: URL
  }

  type ContactEdge {
    node: Contact
    cursor: String!
  }

  type ContactConnection {
    edges: [ContactEdge]
    pageInfo: PageInfo!
  }

  extend type Query {
    contacts(first: Int, after: String): ContactConnection!
  }
`

export const resolvers = {
  Query: {
    contacts(_, { first = 10, after = `-1` }) {
      const startCursor = parseInt(after) + 1
      const endCursor = Math.min(startCursor + first, MAX_EDGES) - 1
      const hasPreviousPage = after !== `-1`
      const hasNextPage = endCursor !== MAX_EDGES - 1
      return {
        edges: edges.slice(startCursor, endCursor + 1),
        pageInfo: {
          hasNextPage,
          hasPreviousPage,
          startCursor,
          endCursor,
        },
      }
    },
  },
}
