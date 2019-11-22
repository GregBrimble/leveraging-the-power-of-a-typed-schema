import React from "react";
import { action } from "@storybook/addon-actions";
import DateTimeInput from "./DateTimeInput";

export default { title: "Components|Inputs/Scalars/DateTimeInput" };

export const date = () => (
  <DateTimeInput
    includeTime={false}
    onChange={action("onChange")}
    defaultValue={new Date("2019-08-13")}
  />
);

export const dateTime = () => (
  <DateTimeInput
    onChange={action("onChange")}
    defaultValue={new Date("2019-12-13T14:15+02:00")}
  />
);

export const dateTimeTimeZone = () => (
  <DateTimeInput collapsedTimeZone={false} onChange={action("onChange")} />
);
