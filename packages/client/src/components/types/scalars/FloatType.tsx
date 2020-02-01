import React from "react";
import { floatToString, floatFromString } from "../../../utils/float";
import { TypeAttributes } from "./TypeAttributes";

interface FloatTypeProps extends TypeAttributes {
  data: number;
  fractionDigits?: number;
}

const FloatType: React.FC<FloatTypeProps> = ({ data, fractionDigits = 2 }) => (
  <div>{floatToString(data, fractionDigits)}</div>
);

export default FloatType;
