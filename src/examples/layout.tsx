import React from "react";
import Example from "@/components/example";
import Layer from "@/lib/components/layer";

export default function Layout() {
  return (
    <Example>
      <Layer width={1} height={1} backgroundColor="#444444">
        <Layer width={0.25} height={0.25} backgroundColor="red" />
        <Layer width={0.25} height={0.25} backgroundColor="green" />
        <Layer width={0.25} height={0.25} backgroundColor="lightblue" />
      </Layer>
    </Example>
  );
}
