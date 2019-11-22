import React from "react";
import { text } from "@storybook/addon-knobs";
import IDInput from "./IDInput";

export default { title: "Components|Inputs/Scalars/IDInput" };

export const idInput = () => (
  <IDInput value={text("Value", "SGVsbG8gd29ybGQh")} />
);
