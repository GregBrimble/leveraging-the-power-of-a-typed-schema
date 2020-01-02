import React from "react";
import { TypeAttributes } from "./TypeAttributes";

interface StringTypeProps extends TypeAttributes {
  data: string;
}

const StringType: React.FC<StringTypeProps> = ({ data }) => <span>{data}</span>;

export default StringType;
