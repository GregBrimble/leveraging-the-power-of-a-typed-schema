import React, { useState, useEffect } from "react";
import { SelectedInputAttributes } from "./scalars/InputAttributes";

// TODO: Support more timezones
const timeZones = new Set([
  { label: "UTC-1", value: "-01:00" },
  { label: "UTC", value: "+00:00" },
  { label: "BST", value: "+01:00" }
]);

interface TimeZoneInputProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
}

const TimeZoneInput: React.FC<TimeZoneInputProps> = ({
  defaultValue,
  onChange,
  autoFocus
}) => {
  const options = Array.from(timeZones.values()).map(({ label, value }) => (
    <option value={value} key={label + value}>
      {`(${value}) ${label}`}
    </option>
  ));

  const handleChange = (value: string) => {
    if (onChange !== undefined) onChange(value);
  };

  return (
    <select
      className="form-select"
      onChange={e => handleChange(e.target.value)}
      defaultValue={defaultValue}
      autoFocus={autoFocus}
    >
      {options}
    </select>
  );
};

export default TimeZoneInput;
