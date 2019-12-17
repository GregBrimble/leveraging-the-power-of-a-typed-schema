import { getIntrospectionQuery, buildClientSchema } from "graphql";
import { gql, ApolloError, ApolloClient } from "apollo-boost";

export const getSchema = async (client: ApolloClient<any>) => {
  let data;

  try {
    let response = await client.query({
      query: gql(getIntrospectionQuery())
    });
    data = response.data;

    if (response.errors !== undefined)
      return {
        error: new ApolloError({
          graphQLErrors: response.errors,
          errorMessage: "Could not execute introspection query on server."
        })
      };
  } catch (error) {
    return {
      error
    };
  }

  return {
    schema: buildClientSchema(data)
  };
};
