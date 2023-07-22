import React from "react";
import { Interaction, Layer } from "react-xr-ui";

type Props = {
  textContent: string;
  selected: boolean;
  onClick: () => void;
  fontSize: number | `${number}px`;
  width: number;
  height: number;
  fontFamily?: string;
  optimizedRendering?: boolean;
};

export default function Button({ textContent, selected, onClick, fontSize, width, height }: Props) {
  const [pointerOver, setPointerOver] = React.useState(false);

  return (
    <Interaction
      onOver={() => {
        setPointerOver(true);
        document.body.style.cursor = "pointer";
      }}
      onOut={() => {
        setPointerOver(false);
        document.body.style.cursor = "auto";
      }}
      onDown={() => {
        onClick();
        setPointerOver(false);
      }}
    >
      <Layer
        width={width}
        height={height}
        backgroundColor={pointerOver || selected ? "#ffffff" : "#111111"}
        color={pointerOver || selected ? "#111111" : "#ffffff"}
        textContent={textContent}
        fontSize={fontSize}
        textAlign="center"
        verticalAlign="middle"
      />
    </Interaction>
  );
}
