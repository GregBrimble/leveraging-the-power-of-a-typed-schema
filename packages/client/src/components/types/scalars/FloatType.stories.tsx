import React from "react";
import { number } from "@storybook/addon-knobs";
import FloatType from "./FloatType";

export default { title: "Components|Types/Scalars/FloatType" };

export const floatType = () => (
  <FloatType
    value={number("Value", 123.45678)}
    fractionDigits={number("Fraction Digits", 2, {
      min: 0,
      max: 20,
      step: 1
    })}
  />
);
