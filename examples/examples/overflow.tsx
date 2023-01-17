import React from "react";
import Example from "@/components/example";
import { Layer } from "react-xr-ui";
import ViewCode from "@/components/view-code";

export default function Overflow() {
  return (
    <>
      <Example>
        <Layer
          width={1}
          height={1}
          backgroundColor="#444444"
          borderRadius={0.1}
          borderWidth={0.02}
          borderColor="#222222"
          flexDirection="column"
          justifyContent="start"
        >
          <Layer
            width="100%"
            height="150%"
            backgroundColor="rgba(255, 0, 0, 0.5)"
            color="#ffffff"
          />
        </Layer>
      </Example>
      <ViewCode pathname="overflow" />
    </>
  );
}
