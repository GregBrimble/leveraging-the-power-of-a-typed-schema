import React from "react";
import { intToString } from "../../../utils/int";

interface IntTypeProps {
  value: number;
}

const IntType: React.FC<IntTypeProps> = ({ value }) => (
  <>{intToString(value)}</>
);

export default IntType;
