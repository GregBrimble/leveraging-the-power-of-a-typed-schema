import React, { useState, useEffect } from "react";
import PageInfo from "./PageInfo";
import {
  Connection as ConnectionType,
  ConnectionArguments
} from "graphql-relay";
import {
  RenderField,
  RenderFields
} from "../../../introspection/rendering/RenderTypedData";
import { TypeAttributes } from "../scalars/TypeAttributes";
import { FieldNode, VariableNode } from "graphql";
import { useRenderOptions } from "../../../introspection/rendering/RenderOptionsProvider";
import {
  getNodeDataName,
  getField,
  getFields
} from "../../../introspection/tools";
import StringInput from "../../inputs/scalars/StringInput";
import BooleanInput from "../../inputs/scalars/BooleanInput";

interface ConnectionProps<T> extends TypeAttributes {
  data: ConnectionType<T>;
}

const Connection: React.FC<ConnectionProps<any>> = ({ data, field }) => {
  const [connectionArguments, setConnectionArguments] = useState<
    ConnectionArguments & Record<string, any>
  >();
  const {
    nodeTypeMap,
    loadingRenderer: LoadingRenderer,
    useVariables: [variables, setVariables]
  } = useRenderOptions();

  useEffect(() => {
    if (connectionArguments !== undefined) {
      const args: any = {};
      Object.entries(connectionArguments || {}).forEach(([name, value]) => {
        const fieldArguments = (field as FieldNode).arguments || [];
        const arg = fieldArguments.find(arg => arg.name.value === name);
        if (arg === undefined)
          throw new Error(
            `Could not find argument, ${name}, to set to ${value}.`
          );

        args[(arg.value as VariableNode).name.value] = value;
      });
      setVariables({ ...variables, ...args });
    }
  }, [connectionArguments, field, setVariables]);

  if (nodeTypeMap.loading) return <LoadingRenderer />;
  const nodeField = getField(field, "edges.node");

  const fields = getFields(nodeField, nodeTypeMap.map);
  return (
    <div className="flex flex-col mx-8">
      <fieldset className="p-6 bg-gray-200 m-6">
        <div>
          <label>firstNameFilter: </label>
          <StringInput
            onChange={value => {
              setConnectionArguments({
                filter: { firstNameFilter: value },
                after: undefined,
                before: undefined
              });
            }}
          />
        </div>
        <div>
          <label>isAlive: </label>
          <BooleanInput
            onChange={value => {
              console.log("CHANGED");
              setConnectionArguments({
                filter: { isAlive: value },
                after: undefined,
                before: undefined
              });
            }}
          />
        </div>
      </fieldset>
      <table className="table-auto w-full m-4">
        <thead>
          <tr>
            {fields.map(field => {
              const name = getNodeDataName(field);
              return <th key={name}>{name}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.edges
            .map(edge => edge.node)
            .map((node: any, i: number) => {
              return (
                <tr key={i}>
                  <RenderFields
                    data={node}
                    field={nodeField}
                    fieldRenderer={({ data, field }) => (
                      <td className="border px-4 py-2">
                        <RenderField data={data} field={field} />
                      </td>
                    )}
                  />
                </tr>
              );
            })}
        </tbody>
      </table>
      <PageInfo data={data.pageInfo} updateArguments={setConnectionArguments} />
    </div>
  );
};

export default Connection;
