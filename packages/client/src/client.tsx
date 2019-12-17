import ApolloClient from "apollo-boost";

const uri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/"
    : "/graphql";

const client = new ApolloClient({
  uri
});

export { client };
