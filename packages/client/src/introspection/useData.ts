import { useSchema } from "./SchemaProvider";
import { useState, useEffect } from "react";
import { ApolloError, ApolloClient } from "apollo-boost";
import { generateQueryAST } from "./generateQueryAST";
import { GraphQLSchema, DocumentNode } from "graphql";

interface _Data {
  loading: boolean;
  error?: ApolloError;
  query?: DocumentNode;
  data?: any;
  schema?: GraphQLSchema;
}

interface LoadingData extends _Data {
  loading: true;
}

interface ErroredData extends _Data {
  loading: false;
  error: ApolloError;
}

interface LoadedData extends _Data {
  loading: false;
  error?: undefined;
  query: DocumentNode;
  data: any;
  schema: GraphQLSchema;
}

type Data = LoadingData | ErroredData | LoadedData;

// TODO: Cast to types
const sanitizeData = (key: string, value: any) =>
  key === "__typename" ? undefined : value;

export const useData = (client: ApolloClient<any>) => {
  const schema = useSchema();
  const [data, setData] = useState<Data>({
    loading: true
  });

  useEffect(() => {
    (async () => {
      if (schema.schema) {
        try {
          const query = generateQueryAST(schema.schema);
          const { data } = await client.query({ query });
          setData({
            loading: false,
            query,
            data: JSON.parse(JSON.stringify(data, sanitizeData)),
            schema: schema.schema
          });
        } catch (error) {
          setData({ loading: false, error });
        }
      }
    })();
  }, [schema, client]);

  return data;
};
