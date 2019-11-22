import React from "react";
import IntInput from "./IntInput";
import { action } from "@storybook/addon-actions";

export default { title: "Components|Inputs/Scalars/IntInput" };

export const intInput = () => <IntInput onChange={action("onChange")} />;
