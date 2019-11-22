import React from "react";
import { floatToString } from "../../../utils/float";

interface FloatTypeProps {
  value: number;
  fractionDigits?: number;
}

const FloatType: React.FC<FloatTypeProps> = ({ value, fractionDigits = 2 }) => (
  <>{floatToString(value, fractionDigits)}</>
);

export default FloatType;
