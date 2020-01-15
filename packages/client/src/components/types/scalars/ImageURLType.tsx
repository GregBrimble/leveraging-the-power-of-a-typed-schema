import React from "react";
import { TypeAttributes } from "./TypeAttributes";

interface ImageURLTypeProps extends TypeAttributes {
  data: string;
}

const ImageURLType: React.FC<ImageURLTypeProps> = ({ data }) => (
  <img src={data} style={{ maxHeight: 150 }} className="mx-auto" />
);

export default ImageURLType;
