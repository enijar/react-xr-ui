import React from "react";
import Example from "@/components/example";
import { Layer } from "../../lib";
import Button from "@/components/button";
import ViewCode from "@/components/view-code";

export default function Padding() {
  const sizes = React.useMemo(() => {
    return {
      xl: 0.25,
      m: 0.15,
      s: 0.1,
    };
  }, []);

  const [size, setSize] = React.useState<keyof typeof sizes>("m");

  return (
    <>
      <Example>
        <Layer width={1} height={0.1} gap={0.05} position-y={0.5}>
          <Button
            width={0.1}
            height={0.1}
            fontSize={0.5}
            textContent="XL"
            selected={size === "xl"}
            onClick={() => setSize("xl")}
          />
          <Button
            width={0.1}
            height={0.1}
            fontSize={0.5}
            textContent="M"
            selected={size === "m"}
            onClick={() => setSize("m")}
          />
          <Button
            width={0.1}
            height={0.1}
            fontSize={0.5}
            textContent="S"
            selected={size === "s"}
            onClick={() => setSize("s")}
          />
        </Layer>
        <Layer
          width={0.5}
          height={0.5}
          padding={sizes[size]}
          backgroundColor="crimson"
          alignItems="start"
          justifyContent="start"
          gap={0.1}
        >
          <Layer
            width={0.2}
            height={0.2}
            backgroundColor="#333333"
            borderRadius={0.25}
          />
        </Layer>
      </Example>
      <ViewCode pathname="padding" />
    </>
  );
}
