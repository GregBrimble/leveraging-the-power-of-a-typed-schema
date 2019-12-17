import React from "react";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { SchemaProvider } from "./introspection/SchemaProvider";
import { DebugSchema } from "./components/debug/DebugSchema";
import { client } from "./client";
import { useData } from "./introspection/useData";
import { RenderTypedData } from "./introspection/RenderTypedData";
import { gql } from "apollo-boost";

const Demo: React.FC = () => {
  const data = useData(client);

  if (data.loading) return <p>Loading...</p>;
  if (data.error) return <p>Execution Error: {data.error.toString()}</p>;

  return (
    <RenderTypedData data={data.data} document={data.query} selector="debug" />
  );
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <SchemaProvider client={client}>
        <DebugSchema />
        <Demo />
      </SchemaProvider>
    </ApolloProvider>
  );
};

export default App;
