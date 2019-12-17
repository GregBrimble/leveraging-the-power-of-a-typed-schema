import React from "react";
import { dateToString } from "../../../utils/date";
import { TypeAttributes } from "./TypeAttributes";

interface DateTimeTypeProps extends TypeAttributes {
  value: Date;
  format?: string;
}

const DateTimeType: React.FC<DateTimeTypeProps> = ({ value, format }) => {
  return <>{dateToString(value, format)}</>;
};

export default DateTimeType;
