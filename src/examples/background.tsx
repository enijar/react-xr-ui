import React from "react";
import Example from "@/components/example";
import Layer from "@/lib/components/layer";

export default function Background() {
  return (
    <Example>
      <Layer
        width={1}
        height={1}
        backgroundImage="./assets/images/robot.png"
        backgroundSize="cover"
        borderRadius={0.1}
        borderWidth={0.02}
        borderColor="#222222"
        backgroundPosition={[0.5, 0.5]}
      />
    </Example>
  );
}