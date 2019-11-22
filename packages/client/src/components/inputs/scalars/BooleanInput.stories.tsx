import React from "react";
import BooleanInput from "./BooleanInput";
import { action } from "@storybook/addon-actions";

export default { title: "Components|Inputs/Scalars/BooleanInput" };

export const booleanInput = () => (
  <BooleanInput onChange={action("onChange")} placeholder={"greg"} />
);
