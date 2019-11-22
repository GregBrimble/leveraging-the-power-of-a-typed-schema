import React from "react";
import { safelyOnChange } from "../../../utils/input";
import { SelectedInputAttributes } from "./InputAttributes";

interface BooleanInputProps extends SelectedInputAttributes {
  defaultValue?: boolean;
  onChange?: (value?: boolean) => void;
}

const BooleanInput: React.FC<BooleanInputProps> = ({
  defaultValue,
  onChange,
  ...props
}) => (
  <input
    type="checkbox"
    className="form-checkbox"
    defaultChecked={!!defaultValue}
    onChange={e => safelyOnChange(e.target.checked, onChange, value => !!value)}
    {...props}
  />
);

export default BooleanInput;
