import React from "react";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { client } from "./client";
import gql from "graphql-tag";

const Test: React.FC = () => {
  const { loading, error, data } = useQuery(
    gql`
      {
        helloe
      }
    `
  );
  if (loading) return <span>Loading</span>;
  if (error) return <span>Error: {error.message}</span>;

  return <span>{data.hello}</span>;
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Test />
      </div>
    </ApolloProvider>
  );
};

export default App;
