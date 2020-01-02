import React from "react";
import { urlToString, urlFromString } from "../../../utils/url";
import { TypeAttributes } from "./TypeAttributes";

interface URLTypeProps extends TypeAttributes {
  data: string;
}

const isExternal = (url: URL): boolean => {
  const windowURL = new URL(window.location.href);
  return url.hostname !== windowURL.hostname;
};

const URLType: React.FC<URLTypeProps> = ({ data, field }) => {
  const value = urlFromString(data);
  const otherProps = isExternal(value)
    ? {
        target: "_blank",
        rel: "noreferrer"
      }
    : {};

  return (
    <a href={urlToString(value)} className={"underline"} {...otherProps}>
      {field.name?.value}
    </a>
  );
};

export default URLType;
