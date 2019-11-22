import React from "react";

interface IDTypeProps {
  value: string;
}

const IDType: React.FC<IDTypeProps> = ({ value }) => (
  <span hidden={true}>{value}</span>
);

export default IDType;
