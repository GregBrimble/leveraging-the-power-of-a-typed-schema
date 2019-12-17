import React, {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState
} from "react";
import { getSchema } from "./getSchema";
import { GraphQLSchema } from "graphql";
import { ApolloError } from "apollo-boost";

interface _Schema {
  loading: boolean;
  schema?: GraphQLSchema;
  error?: ApolloError;
}

interface LoadingSchema extends _Schema {
  loading: true;
}

interface ErroredSchema extends _Schema {
  loading: false;
  schema: undefined;
  error: ApolloError;
}

interface LoadedSchema extends _Schema {
  loading: false;
  schema: GraphQLSchema;
  error: undefined;
}

type Schema = LoadingSchema | ErroredSchema | LoadedSchema;

const initSchema: LoadingSchema = {
  loading: true
};

const SchemaContext = createContext<Schema>(initSchema);

export const SchemaProvider: React.FC<{
  children: ReactNode;
  client: any;
}> = ({ children, client }) => {
  const [schema, setSchema] = useState<Schema>(initSchema);

  useEffect(() => {
    (async () => {
      if (schema.loading) {
        const { schema, error } = await getSchema(client);
        setSchema({
          loading: false,
          schema,
          error
        });
      }
    })();
  }, [schema, client]);

  return (
    <SchemaContext.Provider value={schema}>{children}</SchemaContext.Provider>
  );
};

export const useSchema = () => useContext(SchemaContext);
