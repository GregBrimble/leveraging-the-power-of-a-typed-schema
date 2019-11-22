import React from "react";
import { urlToString } from "../../../utils/url";

interface URLTypeProps {
  value: URL;
}

const isExternal = (url: URL): boolean => {
  const windowURL = new URL(window.location.href);
  return url.hostname !== windowURL.hostname;
};

const URLType: React.FC<URLTypeProps> = ({ value, children }) => {
  const otherProps = isExternal(value)
    ? {
        target: "_blank",
        rel: "noreferrer"
      }
    : {};

  return (
    <a href={urlToString(value)} className={"underline"} {...otherProps}>
      {children}
    </a>
  );
};

export default URLType;
