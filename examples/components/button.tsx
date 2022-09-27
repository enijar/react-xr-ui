import { GroupProps } from "@react-three/fiber";
import React from "react";
import { Layer } from "react-xr-ui";

type Props = {
  textContent: string;
  selected: boolean;
  onClick: GroupProps["onClick"];
  fontSize: number;
  width: number;
  height: number;
  fontFamily?: string;
};

export default function Button({
  textContent,
  selected,
  onClick,
  fontSize,
  width,
  height,
  fontFamily = "system-ui, sans-serif",
}: Props) {
  const [pointerOver, setPointerOver] = React.useState(false);

  return (
    <Layer
      width={width}
      height={height}
      backgroundColor={pointerOver || selected ? "white" : "#111111"}
      color={pointerOver || selected ? "#111111" : "white"}
      textContent={textContent}
      fontFamily={fontFamily}
      fontSize={fontSize}
      textAlign="center"
      verticalAlign="middle"
      onPointerOver={() => setPointerOver(true)}
      onPointerOut={() => setPointerOver(false)}
      onPointerDown={(event) => {
        onClick(event);
        setPointerOver(false);
      }}
    />
  );
}
