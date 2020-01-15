import React, { ReactNode, useEffect, useState } from "react";
import {
  getNamedType,
  DocumentNode,
  OperationDefinitionNode,
  FieldNode,
  visit,
  getNullableType,
  isCompositeType,
  isAbstractType,
  GraphQLList,
  ArgumentNode,
  VariableNode
} from "graphql";
import { get } from "lodash";
import BooleanType from "../../components/types/scalars/BooleanType";
import DateTimeType from "../../components/types/scalars/DateTimeType";
import FloatType from "../../components/types/scalars/FloatType";
import IDType from "../../components/types/scalars/IDType";
import IntType from "../../components/types/scalars/IntType";
import StringType from "../../components/types/scalars/StringType";
import URLType from "../../components/types/scalars/URLType";
import PageInfo from "../../components/types/relay/PageInfo";
import {
  RenderOptionsProvider,
  useRenderOptions
} from "../RenderOptionsProvider";
import { TypeAttributes } from "../../components/types/scalars/TypeAttributes";
import { getOperationDefinitionOrDie } from "apollo-utilities";
import Connection from "../../components/types/relay/Connection";
import { getNodeDataName, getField, getFields } from "../tools";
import ImageURLType from "../../components/types/scalars/ImageURLType";
import { useData } from "../useData";
import { useApolloClient } from "@apollo/react-hooks";
import StringInput from "../../components/inputs/scalars/StringInput";

export interface RenderFieldProps {
  data: any;
  field: FieldNode | OperationDefinitionNode;
}

export interface RenderInputProps {
  field: FieldNode | OperationDefinitionNode;
  arg: ArgumentNode;
}

const registrations = new Map<
  string,
  { type?: React.FC<TypeAttributes>; input?: React.FC<any> }
>([
  ["Boolean", { type: BooleanType }],
  ["DateTime", { type: DateTimeType }],
  ["Float", { type: FloatType }],
  ["ID", { type: IDType }],
  ["Int", { type: IntType }],
  ["String", { type: StringType }],
  ["URL", { type: URLType }],
  ["ImageURL", { type: ImageURLType }],
  ["PageInfo", { type: PageInfo }],
  ["UserConnection", { type: Connection }]
]);

const RenderList: React.FC<RenderFieldProps> = ({ data, field }) => (
  <ul>
    {data.map((data: any, i: number) => (
      <li key={i}>
        <RenderField data={data} field={field} />
      </li>
    ))}
  </ul>
);

export const RenderField: React.FC<RenderFieldProps> = ({ data, field }) => {
  const {
    nodeTypeMap,
    loadingRenderer: LoadingRenderer,
    defaultRenderer: DefaultRenderer
  } = useRenderOptions();
  if (nodeTypeMap.loading) return <LoadingRenderer />;

  const type = nodeTypeMap.map.get(field);
  if (!type) return <DefaultRenderer data={data} field={field} />;

  if (Array.isArray(data) && getNullableType(type) instanceof GraphQLList)
    return <RenderList data={data} field={field} />;

  const namedType = getNamedType(type);

  const registration = registrations.get(namedType.name);
  if (registration && registration.type) {
    const TypedComponent = registration.type;
    return <TypedComponent data={data} field={field} />;
  }

  return <RenderFields data={data} field={field} />;
};

const RenderInputs: React.FC<{ field: FieldNode }> = ({ field }) => {
  const {
    nodeTypeMap,
    useVariables: [variables, setVariables],
    loadingRenderer: LoadingRenderer
  } = useRenderOptions();
  if (nodeTypeMap.loading) return <LoadingRenderer />;

  const type = nodeTypeMap.map.get(field);
  console.log(field, type);
  if (!type)
    return (
      <span>
        Oops. Can't render inputs because the field doesn't have a type.
      </span>
    );

  const namedType = getNamedType(type);
  console.log();

  const args = field.arguments;
  if (args !== undefined && args.length > 0)
    return <div>{args.map(arg => arg.name.value)}</div>;

  return <></>;
};

export const RenderFields: React.FC<{
  fieldRenderer?: React.FC<RenderFieldProps>;
} & RenderFieldProps> = ({
  data,
  field,
  fieldRenderer: FieldRenderer = RenderField
}) => {
  const {
    nodeTypeMap,
    loadingRenderer: LoadingRenderer,
    defaultRenderer: DefaultRenderer
  } = useRenderOptions();
  if (nodeTypeMap.loading) return <LoadingRenderer />;

  let inputs = <></>;
  if (field.kind === "Field") inputs = <RenderInputs field={field} />;

  let types = <DefaultRenderer data={data} field={field} />;

  const fields = getFields(field, nodeTypeMap.map);
  if (fields.length > 0)
    types = (
      <>
        {Object.entries(data).map(([name, data]) => {
          const field = fields.find(field => getNodeDataName(field) === name);
          if (field === undefined)
            throw new Error(`Could not find field, ${name}, in document.`);

          return <FieldRenderer data={data} key={name} field={field} />;
        })}
      </>
    );

  return (
    <>
      {inputs}
      {types}
    </>
  );
};

export const RenderTypedData: React.FC<{
  data: any;
  document: DocumentNode;
  defaultRenderer?: React.FC<{
    data: any;
    field: FieldNode | OperationDefinitionNode;
  }>;
  loadingRenderer?: React.FC;
}> = ({ document, defaultRenderer, loadingRenderer }) => {
  const client = useApolloClient();
  const [variables, setVariables] = useState<Record<string, any>>({});
  const data = useData(client, document, variables);

  if (data.loading) return <span>Loading</span>;
  if (data.error) return <span>Error</span>;

  const operationDefinitionNode = getOperationDefinitionOrDie(document);

  return (
    <RenderOptionsProvider
      operationDefinitionNode={operationDefinitionNode}
      useVariables={[variables, setVariables]}
      defaultRenderer={defaultRenderer}
      loadingRenderer={loadingRenderer}
    >
      <RenderFields data={data.data} field={operationDefinitionNode} />
    </RenderOptionsProvider>
  );
};
