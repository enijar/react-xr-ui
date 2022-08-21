import React from "react";
import Example from "@/components/example";
import Layer from "@/lib/components/layer";
import { LayerProps } from "@/lib/types";

export default function Layout() {
  const [flexDirection, setFlexDirection] =
    React.useState<LayerProps["flexDirection"]>("row");

  return (
    <Example>
      <Layer
        width={0.25}
        height={0.1}
        position-y={0.6}
        justifyContent="space-between"
      >
        <Layer
          width={0.1}
          height={0.1}
          onClick={() => setFlexDirection("row")}
          backgroundColor="white"
        />
        <Layer
          width={0.1}
          height={0.1}
          onClick={() => setFlexDirection("column")}
          backgroundColor="black"
        />
      </Layer>
      <Layer
        width={1}
        height={1}
        borderWidth={0.025}
        borderColor="#222222"
        borderRadius={0.05}
        backgroundColor="#444444"
        flexDirection={flexDirection}
        alignItems="center"
        justifyContent="space-around"
      >
        <Layer width={0.25} height={0.25} backgroundColor="red" />
        <Layer width={0.25} height={0.25} backgroundColor="green" />
        <Layer width={0.25} height={0.25} backgroundColor="lightblue" />
      </Layer>
    </Example>
  );
}
