import { FieldNode, ASTNode, OperationDefinitionNode } from "graphql";

export interface TypeAttributes {
  data: any;
  field: FieldNode | OperationDefinitionNode;
}
