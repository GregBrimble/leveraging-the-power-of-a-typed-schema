import React from "react";
import { useSchema } from "../../introspection/SchemaProvider";
import { printSchema, print } from "graphql";
import { generateQueryAST } from "../../introspection/generateQueryAST";

export const DebugSchema: React.FC = () => {
  const schema = useSchema();
  let content;

  if (schema.loading) {
    content = <div>Loading...</div>;
  } else if (schema.error) {
    content = (
      <pre>
        <samp>{JSON.stringify(schema.error, null, 4)}</samp>
      </pre>
    );
  } else {
    console.group("GraphQLSchema object:");
    console.debug(schema.schema);
    console.groupEnd();

    generateQueryAST(schema.schema);

    content = (
      <div>
        <details>
          <summary>GraphQLSchema object</summary>
          <p>
            Check the console for the infinitely more useful digital version.
          </p>
          <pre>
            <samp>{JSON.stringify(schema.schema, null, 4)}</samp>
          </pre>
        </details>
        <details>
          <summary>Schema Language</summary>
          <pre>
            <samp>{printSchema(schema.schema)}</samp>
          </pre>
        </details>
        <details>
          <summary>Query AST</summary>
          <pre>
            <samp>{print(generateQueryAST(schema.schema))}</samp>
          </pre>
        </details>
      </div>
    );
  }

  return (
    <div>
      <p className="text-lg">Debug Schema</p>
      {content}
    </div>
  );
};
