import React from "react";
import BooleanType from "./BooleanType";
import { boolean } from "@storybook/addon-knobs";

export default { title: "Components|Types/Scalars/BooleanType" };

export const text = () => (
  <BooleanType value={boolean("Value", true)} as="text" />
);
export const icon = () => (
  <BooleanType value={boolean("Value", true)} as="icon" />
);
export const pill = () => (
  <BooleanType value={boolean("Value", true)} as="pill" />
);
