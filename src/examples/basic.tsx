import React from "react";
import Example from "@/components/example";
import { Layer } from "../../lib";
import Button from "@/components/button";
import ViewCode from "@/components/view-code";

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
          width={sizes[size]}
          height={sizes[size]}
          backgroundColor="crimson"
        />
      </Example>
      <ViewCode pathname="basic" />
    </>
  );
}
