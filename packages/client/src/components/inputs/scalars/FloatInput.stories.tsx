import React from "react";
import { number } from "@storybook/addon-knobs";
import FloatInput from "./FloatInput";
import { action } from "@storybook/addon-actions";

export default { title: "Components|Inputs/Scalars/FloatInput" };

export const floatInput = () => (
  <FloatInput
    fractionDigits={number("Fraction Digits", 2, {
      range: true,
      min: 0,
      max: 20,
      step: 1
    })}
    onChange={action("onChange")}
  />
);
