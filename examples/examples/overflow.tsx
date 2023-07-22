import React from "react";
import Example from "@/components/example";
import { Layer, LayerProps } from "react-xr-ui";
import Button from "@/components/button";
import ViewCode from "@/components/view-code";

export default function Basic() {
  const [overflow, setOverflow] = React.useState<LayerProps["overflow"]>("hidden");

  return (
    <>
      <Example>
        <Layer width={1} height={0.1} gap={0.05} position-y={0.5}>
          <Button
            width={0.2}
            height={0.1}
            fontSize={0.5}
            textContent="hidden"
            selected={overflow === "hidden"}
            onClick={() => setOverflow("hidden")}
          />
          <Button
            width={0.2}
            height={0.1}
            fontSize={0.5}
            textContent="auto"
            selected={overflow === "auto"}
            onClick={() => setOverflow("auto")}
          />
          <Button
            width={0.2}
            height={0.1}
            fontSize={0.5}
            textContent="visible"
            selected={overflow === "visible"}
            onClick={() => setOverflow("visible")}
          />
        </Layer>

        <Layer width={1.2} height={0.6} overflow={overflow} backgroundColor="#111111" borderRadius={0.1}>
          <Layer width="50%" height="110%" backgroundColor="crimson" />
        </Layer>
      </Example>
      <ViewCode pathname="basic" />
    </>
  );
}
