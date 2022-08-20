import React from "react";
import Example from "@/components/example";
import Layer from "@/lib/components/layer";

export default function Background() {
  return (
    <Example>
      <Layer
        width={1.5}
        height={1}
        backgroundColor="rgba(255, 0, 0, 0.5)"
        borderRadius={[48, 256, 48, 256]}
        borderWidth={10}
        borderColor="rgba(255, 255, 255, 0.25)"
      />
    </Example>
  );
}
