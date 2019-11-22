import React from "react";
import { SelectedInputAttributes } from "./InputAttributes";
import { floatFromString, floatToString } from "../../../utils/float";
import { safelyOnChange } from "../../../utils/input";

interface FloatInputProps extends SelectedInputAttributes {
  defaultValue?: number;
  fractionDigits?: number;
  onChange?: (value?: number) => void;
}

// TODO: onChange too many decimal places
const FloatInput: React.FC<FloatInputProps> = ({
  fractionDigits,
  defaultValue,
  onChange,
  ...props
}) => {
  const step = fractionDigits ? Math.pow(10, -fractionDigits) : undefined;
  const pattern = undefined; // TODO
  const value = defaultValue ? floatToString(defaultValue) : undefined;

  return (
    <input
      type="number"
      className="form-input"
      step={step}
      pattern={pattern}
      defaultValue={value}
      onChange={e =>
        safelyOnChange(e.target.value, onChange, (value: string) =>
          floatFromString(value, fractionDigits)
        )
      }
      {...props}
    />
  );
};

export default FloatInput;
