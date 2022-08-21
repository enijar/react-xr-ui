import React from "react";
import Example from "@/components/example";
import Layer from "@/lib/components/layer";

export default function Layout() {
  return (
    <Example>
      <Layer
        width={1}
        height={1}
        borderWidth={0.025}
        borderColor="#222222"
        borderRadius={0.05}
        backgroundColor="#444444"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Layer width={0.25} height={0.25} backgroundColor="red" />
        <Layer width={0.25} height={0.25} backgroundColor="green" />
        <Layer width={0.25} height={0.25} backgroundColor="lightblue" />
      </Layer>
    </Example>
  );
}
