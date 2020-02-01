import React from "react";
import { dateToString, dateFromString } from "../../../utils/date";
import { TypeAttributes } from "./TypeAttributes";

interface DateTimeTypeProps extends TypeAttributes {
  data: string;
  format?: string;
}

const DateTimeType: React.FC<DateTimeTypeProps> = ({ data, format }) => (
  <div>{dateToString(dateFromString(data), format)}</div>
);

export default DateTimeType;
