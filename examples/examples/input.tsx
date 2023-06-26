import React from "react";
import Example from "@/components/example";
import { Layer, Keyboard } from "react-xr-ui";
import ViewCode from "@/components/view-code";

export default function Input() {
  return (
    <>
      <Example>
        <Layer flexDirection="column">
          <Layer
            width={1}
            height={0.1}
            fontSize={1}
            textContent="Enter your name"
            textAlign="center"
          />
          <Keyboard />
        </Layer>
      </Example>
      <ViewCode pathname="input" />
    </>
  );
}
