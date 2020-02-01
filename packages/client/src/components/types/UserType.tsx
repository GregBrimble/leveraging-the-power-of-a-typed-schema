import React from "react";
import { RenderField } from "../../introspection/rendering/RenderTypedData";
import { FieldNode, OperationDefinitionNode } from "graphql";
import { getField } from "../../introspection/tools";

interface UserTypeProps {
  data: any;
  field: FieldNode | OperationDefinitionNode;
}

const UserType: React.FC<UserTypeProps> = ({ data, field }) => {
  return (
    <div className="flex justify-center py-12">
      <div className="shadow-lg learning-normal w-64 rounded-lg">
        <div className="md:flex bg-white rounded-lg p-6">
          <div className="mx-auto md:mx-0 md:mr-6">
            <RenderField data={data.image} field={getField(field, "image")} />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-lg my-2">
              <RenderField
                data={data.firstName}
                field={getField(field, "firstName")}
              />{" "}
              <RenderField
                data={data.lastName}
                field={getField(field, "lastName")}
              />
            </h2>
            <RenderField data={data.status} field={getField(field, "status")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserType;
