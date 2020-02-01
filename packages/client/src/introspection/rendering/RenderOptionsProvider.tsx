import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
  Dispatch
} from "react";
import { useSchema } from "../schema/SchemaProvider";
import {
  ASTNode,
  GraphQLType,
  OperationDefinitionNode,
  FieldNode
} from "graphql";
import { generateASTNodeGraphQLFieldMapFromSchema } from "../generateASTNodeGraphQLFieldMap";
import { getNodeDataName } from "../tools";
import { RenderFieldProps } from "./RenderTypedData";

interface _NodeTypeMap {
  loading: boolean;
  map?: Map<ASTNode, GraphQLType>;
}

interface LoadingNodeTypeMap extends _NodeTypeMap {
  loading: true;
}

interface LoadedNodeTypeMap extends _NodeTypeMap {
  loading: false;
  map: Map<ASTNode, GraphQLType>;
}

type RenderOptions = {
  nodeTypeMap: LoadingNodeTypeMap | LoadedNodeTypeMap;
  useVariables: [any, Dispatch<any>];
  defaultRenderer: React.FC<RenderFieldProps>;
  loadingRenderer: React.FC;
};

const DefaultRenderer: React.FC<RenderFieldProps> = ({ data, field }) => {
  const { nodeTypeMap } = useRenderOptions();
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

const initRenderOptions: RenderOptions = {
  nodeTypeMap: { loading: true },
  useVariables: [{}, () => {}],
  defaultRenderer: DefaultRenderer,
  loadingRenderer: LoadingRenderer
};

const RenderOptionsContext = createContext<RenderOptions>(initRenderOptions);

export const RenderOptionsProvider: React.FC<{
  children: ReactNode;
  operationDefinitionNode: OperationDefinitionNode;
  useVariables?: [any, Dispatch<any>];
  defaultRenderer?: React.FC<RenderFieldProps>;
  loadingRenderer?: React.FC;
}> = ({
  children,
  operationDefinitionNode,
  useVariables = [{}, () => {}],
  defaultRenderer = DefaultRenderer,
  loadingRenderer = LoadingRenderer
}) => {
  const schema = useSchema();
  const [renderOptions, setRenderOptions] = useState<RenderOptions>(
    initRenderOptions
  );

  useEffect(() => {
    if (!schema.loading && schema.error === undefined) {
      // TODO: Handle schema error
      setRenderOptions({
        nodeTypeMap: {
          loading: false,
          map: generateASTNodeGraphQLFieldMapFromSchema(
            schema.schema,
            operationDefinitionNode
          )
        },
        useVariables,
        defaultRenderer,
        loadingRenderer
      });
    }
  }, [
    operationDefinitionNode,
    schema,
    defaultRenderer,
    loadingRenderer,
    useVariables
  ]);

  return (
    <RenderOptionsContext.Provider value={renderOptions}>
      {children}
    </RenderOptionsContext.Provider>
  );
};

export const useRenderOptions = () => useContext(RenderOptionsContext);
