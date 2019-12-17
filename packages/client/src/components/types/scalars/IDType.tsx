import React from "react";
import { TypeAttributes } from "./TypeAttributes";

interface IDTypeProps extends TypeAttributes {
  value: string;
}

const IDType: React.FC<IDTypeProps> = ({ value }) => (
  <span hidden={true}>{value}</span>
);

export default IDType;
