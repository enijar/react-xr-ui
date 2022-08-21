import React from "react";
import Example from "@/components/example";
import Layer from "@/lib/components/layer";

export default function Typography() {
  return (
    <Example>
      <Layer
        width={1}
        height={1}
        borderWidth={0.025}
        borderColor="#222222"
        borderRadius={0.05}
        backgroundColor="#444444"
      >
        <Layer width={0.25} height={0.25} backgroundColor="red" />
      </Layer>
    </Example>
  );
}
