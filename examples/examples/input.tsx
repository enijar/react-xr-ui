import React from "react";
import Example from "@/components/example";
import { Layer, Keyboard } from "react-xr-ui";
import ViewCode from "@/components/view-code";

export default function Input() {
  const [name, setName] = React.useState("");

  return (
    <>
      <Example>
        <Layer flexDirection="column" gap={0.05}>
          <Layer
            width={1}
            height={0.1}
            fontSize={1}
            textContent="Enter your name"
            textAlign="center"
          />
          <Layer
            width={1}
            height={0.1}
            fontSize={0.5}
            textContent={name}
            textAlign="center"
          />
          <Keyboard onChange={setName} />
        </Layer>
      </Example>
      <ViewCode pathname="input" />
    </>
  );
}
