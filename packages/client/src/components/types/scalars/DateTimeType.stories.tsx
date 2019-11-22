import React from "react";
import { date, text } from "@storybook/addon-knobs";
import DateTimeType from "./DateTimeType";

export default { title: "Components|Types/Scalars/DateTimeType" };

const realDate = (name: string, defaultValue = new Date()) =>
  new Date(date(name, defaultValue));

export const relative = () => <DateTimeType value={realDate("Value")} />;
export const formatted = () => (
  <DateTimeType
    value={realDate("Value")}
    format={text("Format", "YYYY MM DD HH:mm")}
  />
);
