import React from "react";
import { intToString } from "../../../utils/int";
import { TypeAttributes } from "./TypeAttributes";

interface IntTypeProps extends TypeAttributes {
  value: number;
}

const IntType: React.FC<IntTypeProps> = ({ value }) => (
  <>{intToString(value)}</>
);

export default IntType;
