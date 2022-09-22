import React from "react";
import Example from "@/components/example";
import { Layer } from "../../lib";
import ViewCode from "@/components/view-code";
import Button from "@/components/button";

export default function RelativeSizing() {
  const sizes = React.useMemo(() => {
    return {
      xl: "75%",
      m: "50%",
      s: "25%",
    };
  }, []);

  const [size, setSize] = React.useState<keyof typeof sizes>("m");

  return (
    <>
      <Example>
        <Layer width={1} height={0.1} gap={0.05} position-y={0.6}>
          <Button
            width={0.1}
            height={0.1}
            fontSize={0.35}
            textContent={sizes.xl}
            selected={size === "xl"}
            onClick={() => setSize("xl")}
          />
          <Button
            width={0.1}
            height={0.1}
            fontSize={0.35}
            textContent={sizes.m}
            selected={size === "m"}
            onClick={() => setSize("m")}
          />
          <Button
            width={0.1}
            height={0.1}
            fontSize={0.35}
            textContent={sizes.s}
            selected={size === "s"}
            onClick={() => setSize("s")}
          />
        </Layer>
        <Layer gap={0.1} backgroundColor="crimson">
          <Layer
            width={sizes[size]}
            height={sizes[size]}
            backgroundColor="#333333"
          />
        </Layer>
      </Example>
      <ViewCode pathname="relative-sizing" />
    </>
  );
}
