import {
  GraphQLSchema,
  FieldNode,
  visit,
  OperationDefinitionNode,
  GraphQLType,
  ASTNode
} from "graphql";
import { getFields } from "./generation/generateQueryAST";

const generateASTNodeGraphQLFieldMap = (
  root: ASTNode,
  type: GraphQLType
): Map<ASTNode, GraphQLType> => {
  const nodeTypeMap = new Map<ASTNode, GraphQLType>([[root, type]]);

  const stack: GraphQLType[] = [];
  let currentType = type;
  visit(root, {
    Field: {
      enter(node) {
        const fields = getFields(currentType) || {};
        const field = fields[node.name.value];
        if (field === undefined)
          throw new Error(
            `The query contains a field, ${node.name.value}, that doesn't exist in the schema on the ${currentType} type.`
          );
        stack.push(currentType);
        currentType = field.type;
      },
      leave(node) {
        nodeTypeMap.set(node, currentType);
        currentType = stack.pop() as GraphQLType;
      }
    }
  });

  return nodeTypeMap;
};

export const generateASTNodeGraphQLFieldMapFromSchema = (
  schema: GraphQLSchema,
  operationDefinitionNode: OperationDefinitionNode
) => {
  let type: GraphQLType;

  switch (operationDefinitionNode.operation) {
    case "query":
      const queryType = schema.getQueryType();
      if (!queryType) throw new Error("Schema does not contain a Query type.");
      type = queryType;
      break;
    case "mutation":
      throw new Error("Mutations aren't yet supported.");
    case "subscription":
      throw new Error("Subscriptions aren't yet supported.");
  }

  return generateASTNodeGraphQLFieldMap(operationDefinitionNode, type);
};
