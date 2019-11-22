import React from "react";
import { ReactComponent as TrueIconSVG } from "../../../assets/refactoring-ui/icon-check.svg";
import { ReactComponent as FalseIconSVG } from "../../../assets/refactoring-ui/icon-close-circle.svg";
import { booleanToString } from "../../../utils/boolean";

interface BooleanTypeProps {
  value: boolean;
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

const BooleanType: React.FC<BooleanTypeProps> = ({ value, as = "text" }) => {
  switch (as) {
    case "text":
      return <>{booleanToString(value)}</>;
    case "icon":
      return value ? <TrueIcon /> : <FalseIcon />;
    case "pill":
      return value ? <TruePill /> : <FalsePill />;
  }
};

export default BooleanType;
