import { gql } from "apollo-server-cloudflare";

const typeDefs = gql`
  extend type Query {
    hello: String!
  }
`;

const hello = () => "Hello, world!";

const resolvers = {
  Query: {
    hello: () => "Hello, world!"
  }
};

export { typeDefs, resolvers };
