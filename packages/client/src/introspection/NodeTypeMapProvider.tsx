import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext
} from "react";
import { useSchema } from "./SchemaProvider";
import { ASTNode, GraphQLType, OperationDefinitionNode } from "graphql";
import { generateNodeTypeMapFromSchema } from "./generateNodeTypeMap";

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

type NodeTypeMap = LoadingNodeTypeMap | LoadedNodeTypeMap;

const initNodeTypeMap: LoadingNodeTypeMap = {
  loading: true
};

const NodeTypeMapContext = createContext<NodeTypeMap>(initNodeTypeMap);

export const NodeTypeMapProvider: React.FC<{
  children: ReactNode;
  operationDefinitionNode: OperationDefinitionNode;
}> = ({ children, operationDefinitionNode }) => {
  const schema = useSchema();
  const [nodeTypeMap, setNodeTypeMap] = useState<NodeTypeMap>(initNodeTypeMap);

  useEffect(() => {
    if (!schema.loading && schema.error === undefined) {
      // TODO: Handle schema error
      setNodeTypeMap({
        loading: false,
        map: generateNodeTypeMapFromSchema(
          schema.schema,
          operationDefinitionNode
        )
      });
    }
  }, [schema]);

  return (
    <NodeTypeMapContext.Provider value={nodeTypeMap}>
      {children}
    </NodeTypeMapContext.Provider>
  );
};

export const useNodeTypeMap = () => useContext(NodeTypeMapContext);
