import React from "react";
import { dateToString } from "../../../utils/date";

interface DateTimeTypeProps {
  value: Date;
  format?: string;
}

const DateTimeType: React.FC<DateTimeTypeProps> = ({ value, format }) => {
  return <>{dateToString(value, format)}</>;
};

export default DateTimeType;
