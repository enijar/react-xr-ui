import React from "react";
import Example from "@/components/example";
import { Layer } from "../../lib";
import ViewCode from "@/components/view-code";

export default function RelativeSizing() {
  return (
    <>
      <Example>
        <Layer gap={0.1} backgroundColor="crimson">
          <Layer width="50%" height="50%" backgroundColor="#333333" />
        </Layer>
      </Example>
      <ViewCode pathname="relative-sizing" />
    </>
  );
}
