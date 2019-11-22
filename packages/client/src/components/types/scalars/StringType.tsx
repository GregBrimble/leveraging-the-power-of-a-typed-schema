import React from "react";

interface StringTypeProps {
  value: string;
}

const StringType: React.FC<StringTypeProps> = ({ value }) => <>{value}</>;

export default StringType;
