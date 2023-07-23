import React from "react";
import Example from "@/components/example";
import { Layer } from "react-xr-ui";
import ViewCode from "@/components/view-code";

export default function Borders() {
  return (
    <>
      <Example>
        <Layer
          width={1}
          aspectRatio={1}
          backgroundColor="#555555"
          borderRadius={0.1}
          borderWidth={0.05}
          borderColor="crimson"
          overflow="hidden"
        >
          <Layer
            width="50%"
            aspectRatio={1}
            backgroundColor="pink"
            borderRadius={1}
          />
        </Layer>
      </Example>
      <ViewCode pathname="background" />
    </>
  );
}
