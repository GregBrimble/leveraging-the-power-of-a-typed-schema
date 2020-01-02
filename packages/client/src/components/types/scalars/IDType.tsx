import React from "react";
import { TypeAttributes } from "./TypeAttributes";

interface IDTypeProps extends TypeAttributes {
  data: string;
}

const IDType: React.FC<IDTypeProps> = ({ data }) => (
  <span hidden={true}>{data}</span>
);

export default IDType;
