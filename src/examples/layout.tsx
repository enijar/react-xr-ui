import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Surface from "@/lib/components/surface/surface";

export default function Layout() {
  return (
    <Canvas flat linear>
      {/* Cameras, controls and lights */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls makeDefault />
      <ambientLight />

      {/** Example */}

      <Surface backgroundColor="crimson" width={3} height={3}>
        <Surface
          width={1}
          height={2}
          backgroundSize="contain"
          backgroundColor="green"
          backgroundImage="./assets/images/robot.png"
        />
      </Surface>
    </Canvas>
  );
}
