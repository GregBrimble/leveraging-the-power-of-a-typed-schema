import React from "react";
import { ReactComponent as TrueIconSVG } from "../../../assets/refactoring-ui/icon-check.svg";
import { ReactComponent as FalseIconSVG } from "../../../assets/refactoring-ui/icon-close-circle.svg";
import { booleanToString } from "../../../utils/boolean";
import { TypeAttributes } from "./TypeAttributes";

interface BooleanTypeProps extends TypeAttributes {
  data: boolean;
  as?: "text" | "icon" | "pill";
}

const TruePill: React.FC = () => <div className="pill pill-green">True</div>;
const FalsePill: React.FC = () => <div className="pill pill-red">False</div>;

const Icon: React.FC = ({ children }) => <div className="icon">{children}</div>;
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
      return <div>{booleanToString(data)}</div>;
    case "icon":
      return data ? <TrueIcon /> : <FalseIcon />;
    case "pill":
      return data ? <TruePill /> : <FalsePill />;
  }
};

export default BooleanType;
