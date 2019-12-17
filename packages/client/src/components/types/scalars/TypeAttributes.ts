import { FieldNode, ASTNode, OperationDefinitionNode } from "graphql";

export interface TypeAttributes {
  value: any;
  field: FieldNode | OperationDefinitionNode;
}
