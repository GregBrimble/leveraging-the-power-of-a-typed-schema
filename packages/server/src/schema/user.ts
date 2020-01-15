import { gql } from 'apollo-server-cloudflare'
import { paginate } from './relay'
import { users } from '../fixtures/users'

export const typeDefs = gql`
  scalar ImageURL

  enum Status {
    Alive
    Deceased
  }

  type User implements Node {
    id: ID!
    firstName: String!
    lastName: String!
    image: ImageURL
    url: URL
    status: Status!
  }

  type UserEdge {
    node: User
    cursor: String!
  }

  type UserConnection {
    totalCount: Int!
    edges: [UserEdge]
    pageInfo: PageInfo!
  }

  input UserFilter {
    firstNameFilter: String
    isAlive: Boolean
  }

  extend type Query {
    users(
      first: Int
      after: String
      last: Int
      before: String
      filter: UserFilter
    ): UserConnection!
  }
`

export const resolvers = {
  Query: {
    users(_, { filter, ...args }) {
      let filteredUsers = users

      if (filter !== undefined) {
        if (`firstNameFilter` in filter)
          filteredUsers = filteredUsers.filter(
            user =>
              user.firstName
                .toLowerCase()
                .indexOf(filter.firstNameFilter.toLowerCase()) > -1
          )

        if (`isAlive` in filter)
          filteredUsers = filteredUsers.filter(
            user => user.status === (filter.isAlive ? `Alive` : `Deceased`)
          )
      }

      return paginate(filteredUsers, args)
    },
  },
}

export const mocks = {
  ImageURL: () => `https://via.placeholder.com/128`,
}
