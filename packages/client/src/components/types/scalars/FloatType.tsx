import React from "react";
import { floatToString } from "../../../utils/float";
import { TypeAttributes } from "./TypeAttributes";

interface FloatTypeProps extends TypeAttributes {
  value: number;
  fractionDigits?: number;
}

const FloatType: React.FC<FloatTypeProps> = ({ value, fractionDigits = 2 }) => (
  <>{floatToString(value, fractionDigits)}</>
);

export default FloatType;
