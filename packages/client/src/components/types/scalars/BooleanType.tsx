import React from "react";
import { ReactComponent as TrueIconSVG } from "../../../assets/refactoring-ui/icon-check.svg";
import { ReactComponent as FalseIconSVG } from "../../../assets/refactoring-ui/icon-close-circle.svg";
import { booleanToString } from "../../../utils/boolean";
import { TypeAttributes } from "./TypeAttributes";

interface BooleanTypeProps extends TypeAttributes {
  data: boolean;
  as?: "text" | "icon" | "pill";
}

const TruePill: React.FC = () => <span className="pill pill-green">True</span>;
const FalsePill: React.FC = () => <span className="pill pill-red">False</span>;

const Icon: React.FC = ({ children }) => (
  <span className="icon">{children}</span>
);
const TrueIcon: React.FC = () => (
  <Icon>
    <TrueIconSVG className="icon-green" />
  </Icon>
);
const FalseIcon: React.FC = () => (
  <Icon>
    <FalseIconSVG className="icon-red" />
  </Icon>
);

const BooleanType: React.FC<BooleanTypeProps> = ({ data, as = "icon" }) => {
  switch (as) {
    case "text":
      return <>{booleanToString(data)}</>;
    case "icon":
      return data ? <TrueIcon /> : <FalseIcon />;
    case "pill":
      return data ? <TruePill /> : <FalsePill />;
  }
};

export default BooleanType;
