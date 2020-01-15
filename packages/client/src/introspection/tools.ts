import {
  FieldNode,
  OperationDefinitionNode,
  visit,
  ASTNode,
  GraphQLType,
  getNamedType,
  isCompositeType
} from "graphql";

export const getNodeDataName = (
  field: FieldNode | OperationDefinitionNode
): string => {
  let name = field.name?.value;
  if ("alias" in field) name = field.alias?.value || field.name.value;
  return name as string;
};

export const getField = (
  parentField: OperationDefinitionNode | FieldNode,
  selector: string
) => {
  const selections = parentField.selectionSet?.selections || [];
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

export const getFields = (
  field: FieldNode | OperationDefinitionNode,
  nodeTypeMap: Map<ASTNode, GraphQLType>
): FieldNode[] => {
  const type = nodeTypeMap.get(field);
  if (type) {
    const namedType = getNamedType(type);
    if (isCompositeType(namedType) && field.selectionSet !== undefined) {
      return field.selectionSet.selections.filter(
        field => field.kind === "Field"
      ) as FieldNode[];
    }
  }

  return [];
};
