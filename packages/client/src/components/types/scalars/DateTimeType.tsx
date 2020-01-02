import React from "react";
import { dateToString, dateFromString } from "../../../utils/date";
import { TypeAttributes } from "./TypeAttributes";

interface DateTimeTypeProps extends TypeAttributes {
  data: string;
  format?: string;
}

const DateTimeType: React.FC<DateTimeTypeProps> = ({ data, format }) => (
  <>{dateToString(dateFromString(data), format)}</>
);

export default DateTimeType;
