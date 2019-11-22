import {
  ApolloServer as CloudflareApolloServer,
  gql,
  makeExecutableSchema
} from "apollo-server-cloudflare";
import {
  resolvers as helloResolvers,
  typeDefs as helloTypeDefs
} from "./resolvers/hello";
// import { merge } from "lodash";

// const typeDefs = gql`
//   type Book {
//     title: String
//     author: String
//   }

//   type Query {
//     books: [Book]
//   }
// `;

// const books = [
//   {
//     title: "Harry Potter and the Chamber of Secrets",
//     author: "J.K. Rowling"
//   },
//   {
//     title: "Jurassic Park",
//     author: "Michael Crichton"
//   }
// ];

// const resolvers = {
//   Query: {
//     books: () => books
//   }
// };

const query = gql`
  type Query {
    _empty: String
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [query, helloTypeDefs],
  resolvers: helloResolvers
});

let server = new CloudflareApolloServer({
  schema,
  introspection: true
});

// if (process.env.NODE_ENV === "development") {
//   const { ApolloServer } = require("apollo-server");
//   server = new ApolloServer({
//     schema,
//     introspection: true
//   });
// }

export { server };
