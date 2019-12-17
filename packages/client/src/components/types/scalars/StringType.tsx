import React from "react";
import { TypeAttributes } from "./TypeAttributes";

interface StringTypeProps extends TypeAttributes {
  value: string;
}

const StringType: React.FC<StringTypeProps> = ({ value }) => (
  <span>{value}</span>
);

export default StringType;
