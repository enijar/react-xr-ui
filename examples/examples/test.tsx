import React from "react";
import Example from "@/components/example";
import { Layer } from "react-xr-ui";
import ViewCode from "@/components/view-code";
import Button from "@/components/button";

export default function Test() {
  return (
    <>
      <Example>
        <group position-y={0.6}>
          <Button
            textContent="Test"
            selected={false}
            onClick={() => console.log("test")}
            fontSize="10px"
            width={1}
            height={0.1}
          />
        </group>
        <Layer
          width={1}
          height={1}
          backgroundColor="#111111"
          backgroundSize="cover"
          borderRadius={0.025}
          backgroundPosition={[0.5, 0.5]}
          overflow="hidden"
          alignItems="start"
          justifyContent="start"
        >
          <Layer width="50%" aspectRatio={1} backgroundColor="crimson" borderRadius={0.2} position-y={0.25} />
        </Layer>
      </Example>
      <ViewCode pathname="background" />
    </>
  );
}
