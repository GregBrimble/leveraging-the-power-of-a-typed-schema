import React from "react";
import { TypeAttributes } from "./TypeAttributes";

interface StatusTypeProps extends TypeAttributes {
  data: string;
}

const StatusType: React.FC<StatusTypeProps> = ({ data }) => {
  switch (data) {
    case "Alive":
      return <div className="pill pill-green">Alive</div>;
    case "Deceased":
    default:
      return <div className="pill pill-red">Deceased</div>;
  }
};

export default StatusType;
