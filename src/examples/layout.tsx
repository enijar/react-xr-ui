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
        justifyContent="space-around"
      >
        <Layer width={0.25} height={0.25} backgroundColor="red">
          <mesh position-z={0.075}>
            <dodecahedronBufferGeometry args={[0.075, 0]} />
            <meshBasicMaterial color="white" />
          </mesh>
        </Layer>
        <Layer width={0.25} height={0.25} backgroundColor="green">
          <mesh position-z={0.075}>
            <boxBufferGeometry args={[0.15, 0.15, 0.15]} />
            <meshBasicMaterial color="white" />
          </mesh>
        </Layer>
        <Layer width={0.25} height={0.25} backgroundColor="lightblue">
          <mesh position-z={0.075}>
            <octahedronBufferGeometry args={[0.075, 0]} />
            <meshBasicMaterial color="white" />
          </mesh>
        </Layer>
      </Layer>
    </Example>
  );
}
