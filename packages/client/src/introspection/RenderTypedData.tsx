import React, { ReactNode, useEffect, useState } from "react";
import {
  GraphQLList,
  getNamedType,
  DocumentNode,
  OperationDefinitionNode,
  FieldNode,
  visit
} from "graphql";
import { get } from "lodash";
import BooleanType from "../components/types/scalars/BooleanType";
import DateTimeType from "../components/types/scalars/DateTimeType";
import FloatType from "../components/types/scalars/FloatType";
import IDType from "../components/types/scalars/IDType";
import IntType from "../components/types/scalars/IntType";
import StringType from "../components/types/scalars/StringType";
import URLType from "../components/types/scalars/URLType";
import { NodeTypeMapProvider, useNodeTypeMap } from "./NodeTypeMapProvider";

const Default: React.FC<{
  data: any;
  field: FieldNode | OperationDefinitionNode;
}> = ({ data, field }) => {
  const nodeTypeMap = useNodeTypeMap();
  if (nodeTypeMap.loading) return <p>Loading...</p>;

  const type = nodeTypeMap.map.get(field);

  console.warn("UNKNOWN TYPE OF FIELD", field);

  return (
    <div>
      UNKNOWN TYPE ({type}) OF FIELD ({field}): {JSON.stringify(data)}
    </div>
  );
};

const getNodeDataName = (
  field: FieldNode | OperationDefinitionNode
): string => {
  let name = field.name?.value;
  if ("alias" in field) name = field.alias?.value || field.name.value;
  return name as string;
};

const RenderField: React.FC<{
  data: any;
  field: FieldNode | OperationDefinitionNode;
  defaultRenderer: React.FC<{
    data: any;
    field: FieldNode | OperationDefinitionNode;
  }>;
}> = ({ data, field, defaultRenderer: DefaultRenderer }) => {
  console.log(field.name?.value, data);
  const nodeTypeMap = useNodeTypeMap();
  if (nodeTypeMap.loading) return <p>Loading...</p>;

  const type = nodeTypeMap.map.get(field);

  if (!type) return <DefaultRenderer data={data} field={field} />;

  if (type instanceof GraphQLList) {
    // TODO: Handle lists
    return <p>List</p>;
  }

  const namedType = getNamedType(type);

  switch (namedType.name) {
    case "Boolean":
      return <BooleanType value={data} field={field} />;
    case "DateTime":
      return <DateTimeType value={data} field={field} />;
    case "Float":
      return <FloatType value={data} field={field} />;
    case "ID":
      return <IDType value={data} field={field} />;
    case "Int":
      return <IntType value={data} field={field} />;
    case "String":
      return <StringType value={data} field={field} />;
    case "URL":
      return <URLType value={data} field={field} />;
    default:
      if ("selectionSet" in field) {
        const fields = (field.selectionSet?.selections.filter(
          field => field.kind === "Field"
        ) || []) as FieldNode[];
        return (
          <div>
            {Object.entries(data).map(([name, _]) => {
              const field = fields.find(
                field => getNodeDataName(field) === name
              );
              if (field !== undefined)
                return (
                  <RenderField
                    data={data[name]}
                    key={name}
                    field={field}
                    defaultRenderer={DefaultRenderer}
                  />
                );
            })}
          </div>
        );
      }

      return <DefaultRenderer data={data} field={field} />;
  }
};

const getField = (
  operationDefinitionNode: OperationDefinitionNode,
  selector: string
) => {
  const { selections } = operationDefinitionNode.selectionSet;
  const fieldNodes = selections.filter(
    selection => selection.kind === "Field"
  ) as FieldNode[];
  const selectors = selector.split(".");
  let currentSelector = selectors.shift();
  const field = fieldNodes.find(
    field => getNodeDataName(field) === currentSelector
  );
  console.log(currentSelector);
  if (field === undefined)
    throw new Error(`Could not find field, ${currentSelector}, in document.`);

  let currentField = field;
  visit(field, {
    Field: {
      enter(node) {
        if (getNodeDataName(node) === currentSelector) {
          currentField = node;
          currentSelector = selectors.shift();
        }
      }
    }
  });

  if (selectors.length !== 0) throw new Error("Got lost");
  return currentField;
};

export const RenderTypedData: React.FC<{
  data: any;
  document: DocumentNode;
  selector: string;
  defaultRenderer?: React.FC<{
    data: any;
    field: FieldNode | OperationDefinitionNode;
  }>;
}> = ({ data, document, selector, defaultRenderer = Default }) => {
  const { definitions } = document;
  if (definitions.length !== 1)
    throw new Error(
      "Multiple definitions in a single document aren't yet supported."
    );
  const operationDefinitionNode = document.definitions[0];
  if (operationDefinitionNode.kind !== "OperationDefinition")
    throw new Error("Non-operation definitions are not yet supported.");

  return (
    <NodeTypeMapProvider operationDefinitionNode={operationDefinitionNode}>
      <RenderField
        data={get(data, selector)}
        field={getField(operationDefinitionNode, selector)}
        defaultRenderer={defaultRenderer}
      />
    </NodeTypeMapProvider>
  );
};
