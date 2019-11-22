import React from "react";
import { text } from "@storybook/addon-knobs";
import URLInput from "./URLInput";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components|Inputs/Scalars/URLInput"
};

export const urlInput = () => (
  <URLInput
    placeholder={text("Placeholder", "https://example.com/")}
    onChange={action("onChange")}
  />
);
