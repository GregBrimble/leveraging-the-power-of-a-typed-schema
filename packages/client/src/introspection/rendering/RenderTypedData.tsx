import React, { ReactNode, useEffect, useState } from "react";
import {
  getNamedType,
  DocumentNode,
  OperationDefinitionNode,
  FieldNode,
  visit,
  getNullableType,
  isCompositeType,
  isAbstractType
} from "graphql";
import { get } from "lodash";
import BooleanType from "../../components/types/scalars/BooleanType";
import DateTimeType from "../../components/types/scalars/DateTimeType";
import FloatType from "../../components/types/scalars/FloatType";
import IDType from "../../components/types/scalars/IDType";
import IntType from "../../components/types/scalars/IntType";
import StringType from "../../components/types/scalars/StringType";
import URLType from "../../components/types/scalars/URLType";
import { NodeTypeMapProvider, useNodeTypeMap } from "../NodeTypeMapProvider";
import { TypeAttributes } from "../../components/types/scalars/TypeAttributes";
import { getOperationDefinitionOrDie } from "apollo-utilities";

const DefaultRenderer: React.FC<{
  data: any;
  field: FieldNode | OperationDefinitionNode;
}> = ({ data, field }) => {
  const nodeTypeMap = useNodeTypeMap();
  if (!nodeTypeMap.loading) {
    const type = nodeTypeMap.map.get(field);
    console.warn("Tried to render data unknown.", field, type, data);
  }

  return (
    <div>
      {getNodeDataName(field)}: {JSON.stringify(data)}
    </div>
  );
};

const LoadingRenderer: React.FC<{}> = () => <span>Loading...</span>;

const registrations = new Map<string, React.FC<TypeAttributes>>([
  ["Boolean", BooleanType],
  ["DateTime", DateTimeType],
  ["Float", FloatType],
  ["ID", IDType],
  ["Int", IntType],
  ["String", StringType],
  ["URL", URLType]
]);

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
  loadingRenderer: React.FC<{}>;
}> = ({
  data,
  field,
  defaultRenderer: DefaultRenderer,
  loadingRenderer: LoadingRenderer
}) => {
  const nodeTypeMap = useNodeTypeMap();
  if (nodeTypeMap.loading) return <LoadingRenderer />;

  let type = nodeTypeMap.map.get(field);
  if (!type) return <DefaultRenderer data={data} field={field} />;

  if (Array.isArray(data)) {
    // Pretty gross way to check if the type is a list (prev. getNullableType(type) instanceof GraphQLList)
    return (
      <ul>
        {data.map((data: any, i: number) => (
          <li key={i}>
            <RenderField
              data={data}
              field={field}
              defaultRenderer={DefaultRenderer}
              loadingRenderer={LoadingRenderer}
            />
          </li>
        ))}
      </ul>
    );
  }

  const namedType = getNamedType(type);

  const TypeComponent = registrations.get(namedType.name);
  if (TypeComponent) return <TypeComponent data={data} field={field} />;

  if (isCompositeType(namedType) && field.selectionSet !== undefined) {
    const fields = field.selectionSet.selections.filter(
      field => field.kind === "Field"
    ) as FieldNode[];

    return (
      <div>
        {Object.entries(data).map(([name, data]) => {
          const field = fields.find(field => getNodeDataName(field) === name);
          if (field === undefined)
            throw new Error(`Could not find field, ${name}, in document.`);

          return (
            <RenderField
              data={data}
              key={name}
              field={field}
              defaultRenderer={DefaultRenderer}
              loadingRenderer={LoadingRenderer}
            />
          );
        })}
      </div>
    );
  }

  return <DefaultRenderer data={data} field={field} />;
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

  if (selectors.length !== 0) throw new Error("Got lost navigating the AST.");
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
  loadingRenderer?: React.FC<{}>;
}> = ({
  data,
  document,
  selector,
  defaultRenderer = DefaultRenderer,
  loadingRenderer = LoadingRenderer
}) => {
  const operationDefinitionNode = getOperationDefinitionOrDie(document);

  return (
    <NodeTypeMapProvider operationDefinitionNode={operationDefinitionNode}>
      <RenderField
        data={get(data, selector)}
        field={getField(operationDefinitionNode, selector)}
        defaultRenderer={defaultRenderer}
        loadingRenderer={loadingRenderer}
      />
    </NodeTypeMapProvider>
  );
};
