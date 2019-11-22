import React from "react";
import { SelectedInputAttributes } from "./InputAttributes";
import { urlFromString, urlToString } from "../../../utils/url";
import { safelyOnChange } from "../../../utils/input";

interface URLInputProps extends SelectedInputAttributes {
  defaultValue?: URL;
  onChange?: (value?: URL) => void;
}

const URLInput: React.FC<URLInputProps> = ({
  defaultValue,
  onChange,
  ...props
}) => {
  const value = defaultValue ? urlToString(defaultValue) : undefined;

  return (
    <input
      type="url"
      className="form-input"
      defaultValue={value}
      onChange={e => safelyOnChange(e.target.value, onChange, urlFromString)}
      {...props}
    />
  );
};

export default URLInput;
