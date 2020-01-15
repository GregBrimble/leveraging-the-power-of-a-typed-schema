/*
Inspired by https://github.com/graphql/graphiql/blob/55d6946a1fdad2fa0276e5c33ca3534cc5a63c67/packages/graphiql/src/utility/fillLeafs.js
MIT License: https://github.com/graphql/graphiql/blob/55d6946a1fdad2fa0276e5c33ca3534cc5a63c67/LICENSE
*/
import {
  GraphQLSchema,
  isLeafType,
  DocumentNode,
  getNamedType,
  SelectionSetNode,
  GraphQLField,
  GraphQLType,
  GraphQLFieldMap,
  VariableDefinitionNode
} from "graphql";

export const getFields = (
  type: GraphQLType
): GraphQLFieldMap<any, any> | undefined => {
  if (!type || isLeafType(type)) return;

  const namedType = getNamedType(type);

  if (!("getFields" in namedType)) return;
  const fields = namedType.getFields() as GraphQLFieldMap<any, any>;

  return Object.keys(fields).length !== 0 ? fields : undefined;
};

const buildSelectionSet = (
  type: GraphQLType,
  namePrefix = ""
): SelectionSetNode | undefined => {
  const fields = getFields(type);
  if (fields === undefined) return;

  return {
    kind: "SelectionSet",
    selections: Object.values(fields).map(field => ({
      kind: "Field",
      name: {
        kind: "Name",
        value: field.name
      },
      selectionSet: buildSelectionSet(field.type, namePrefix + field.name),
      arguments: field.args.map(arg => ({
        kind: "Argument",
        name: {
          kind: "Name",
          value: arg.name
        },
        value: {
          kind: "Variable",
          name: {
            kind: "Name",
            value: namePrefix + field.name + arg.name
          }
        }
      }))
    }))
  };
};

const buildVariableDefinitions = (
  type: GraphQLType,
  namePrefix = ""
): VariableDefinitionNode[] => {
  const variableDefinitions: VariableDefinitionNode[] = [];
  const fields = getFields(type) || [];

  for (const field of Object.values(fields)) {
    for (const arg of field.args) {
      const namedType = getNamedType(arg.type);
      variableDefinitions.push({
        kind: "VariableDefinition",
        variable: {
          kind: "Variable",
          name: {
            kind: "Name",
            value: namePrefix + field.name + arg.name
          }
        },
        // TODO: Support non-nullable, and list types
        type: {
          kind: "NamedType",
          name: {
            kind: "Name",
            value: namedType.name
          }
        }
      });
    }

    variableDefinitions.push(
      ...buildVariableDefinitions(field.type, namePrefix + field.name)
    );
  }

  return variableDefinitions;
};

export const generateQueryAST = (schema: GraphQLSchema): DocumentNode => {
  // TODO: Union types
  // TODO: Arguments
  // TODO: Handle deprecated fields
  // TODO: Allow user to limit scope into a point, and then beyond: query { user { name !email } !posts }
  // See https://github.com/timqian/gql-generator/blob/750fc76f6adb95f3634cb1d950eb876e09cdcb41/index.js
  const queryType = schema.getQueryType();
  if (!queryType) throw new Error("Cannot query an API without a QueryType");

  return {
    kind: "Document",
    definitions: [
      {
        kind: "OperationDefinition",
        operation: "query",
        selectionSet: buildSelectionSet(queryType) as SelectionSetNode,
        variableDefinitions: buildVariableDefinitions(queryType)
      }
    ]
  };
};
