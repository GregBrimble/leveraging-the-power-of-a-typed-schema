import React from "react";

interface IDInputProps {
  value: string;
}

// TODO
const IDInput: React.FC<IDInputProps> = ({ value }) => (
  <span hidden={true}>{value}</span>
);

export default IDInput;
