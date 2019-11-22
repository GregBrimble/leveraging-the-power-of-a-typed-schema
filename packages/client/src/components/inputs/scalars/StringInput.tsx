import React from "react";
import { SelectedInputAttributes } from "./InputAttributes";
import { safelyOnChange } from "../../../utils/input";

interface StringInputProps extends SelectedInputAttributes {
  defaultValue?: string;
  onChange?: (value?: string) => void;
}

const StringInput: React.FC<StringInputProps> = ({
  defaultValue,
  onChange,
  ...props
}) => (
  <input
    type="text"
    className="form-input"
    defaultValue={defaultValue}
    onChange={e => safelyOnChange(e.target.value, onChange)}
    {...props}
  />
);

export default StringInput;
