import React from "react";
import { GroupProps } from "@react-three/fiber";
import Example from "@/components/example";
import Layer from "@/lib/components/layer";

type Props = {
  size: string;
  selected: boolean;
  onClick: GroupProps["onClick"];
};
function Button({ size, selected, onClick }: Props) {
  const [pointerOver, setPointerOver] = React.useState(false);

  return (
    <Layer
      width={0.1}
      height={0.1}
      backgroundColor={pointerOver || selected ? "white" : "#111111"}
      color={pointerOver || selected ? "#111111" : "white"}
      textContent={size}
      fontFamily="Arial"
      fontSize={0.5}
      textAlign="center"
      verticalAlign="middle"
      onPointerOver={() => setPointerOver(true)}
      onPointerOut={() => setPointerOver(false)}
      onClick={(event) => {
        onClick(event);
        setPointerOver(false);
      }}
    />
  );
}

export default function Basic() {
  const sizes = React.useMemo(() => {
    return {
      xl: 0.75,
      m: 0.5,
      s: 0.25,
    };
  }, []);

  const [size, setSize] = React.useState<keyof typeof sizes>("m");

  return (
    <Example>
      <Layer width={1} height={0.1} gap={0.05} position-y={0.5}>
        <Button
          size="XL"
          selected={size === "xl"}
          onClick={() => setSize("xl")}
        />
        <Button size="M" selected={size === "m"} onClick={() => setSize("m")} />
        <Button size="S" selected={size === "s"} onClick={() => setSize("s")} />
      </Layer>

      <Layer
        width={sizes[size]}
        height={sizes[size]}
        backgroundColor="crimson"
      />
    </Example>
  );
}
