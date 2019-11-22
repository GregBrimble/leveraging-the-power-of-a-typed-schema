import React from "react";
import { text } from "@storybook/addon-knobs";
import URLType from "./URLType";

export default {
  title: "Components|Types/Scalars/URLType"
};

const url = (name: string, defaultValue: string) =>
  new URL(text(name, defaultValue));

export const urlType = () => (
  <URLType value={url("Value", "https://gregbrimble.com/")}>
    {text("Children", "URLType Children")}
  </URLType>
);
