import React from "react";
import { intToString, intFromString } from "../../../utils/int";
import { TypeAttributes } from "./TypeAttributes";

interface IntTypeProps extends TypeAttributes {
  data: number;
}

const IntType: React.FC<IntTypeProps> = ({ data }) => <>{intToString(data)}</>;

export default IntType;
