import React from "react";
import { SelectedInputAttributes } from "./InputAttributes";
import { intFromString, intToString } from "../../../utils/int";
import { safelyOnChange } from "../../../utils/input";

interface IntInputProps extends SelectedInputAttributes {
  defaultValue?: number;
  onChange?: (value?: number) => void;
}

const IntInput: React.FC<IntInputProps> = ({
  defaultValue,
  onChange,
  ...props
}) => {
  const value = defaultValue ? intToString(defaultValue) : undefined;

  return (
    <input
      type="number"
      className="form-input"
      step={1}
      pattern="[-+]?\d+"
      defaultValue={value}
      onChange={e => safelyOnChange(e.target.value, onChange, intFromString)}
      {...props}
    />
  );
};

export default IntInput;
