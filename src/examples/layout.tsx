import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Surface from "@/lib/components/surface";

export default function Layout() {
  return (
    <Canvas flat linear gl={{ localClippingEnabled: true }}>
      {/** Cameras, controls and lights */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls makeDefault />
      <ambientLight />

      {/** Example */}

      <Surface backgroundColor="crimson" width={3} height={3}>
        <Surface
          position={[-0.5, 0, 0]}
          width={1}
          height={1}
          backgroundSize="cover"
          backgroundColor="green"
          backgroundImage="./assets/images/robot.png"
        />
      </Surface>
    </Canvas>
  );
}
