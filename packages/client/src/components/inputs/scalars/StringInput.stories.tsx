import React from "react";
import { text } from "@storybook/addon-knobs";
import StringInput from "./StringInput";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components|Inputs/Scalars/StringInput"
};

export const stringInput = () => (
  <StringInput
    placeholder={text("Placeholder", "Hello, world!")}
    onChange={action("onChange")}
  />
);
