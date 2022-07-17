import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Surface from "@/lib/components/surface";

const CHILD_SIZE = 0.5;

export default function Layout() {
  return (
    <Canvas flat linear gl={{ localClippingEnabled: true }}>
      {/** Cameras, controls and lights */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls makeDefault />
      <ambientLight />

      {/** Example */}

      <Surface
        backgroundColor="crimson"
        width={3}
        height={3}
        position={[0, 0, 0]}
        justifyContent="center"
        flexDirection="row"
        alignItems="center"
      >
        <Surface
          width={CHILD_SIZE * 2}
          height={CHILD_SIZE}
          backgroundSize="cover"
          backgroundColor="green"
          backgroundImage="./assets/images/landscape.png"
        />
        <Surface
          width={CHILD_SIZE}
          height={CHILD_SIZE}
          backgroundSize="cover"
          backgroundColor="green"
          backgroundImage="./assets/images/robot.png"
        />
        <Surface
          width={CHILD_SIZE}
          height={CHILD_SIZE * 2}
          backgroundSize="cover"
          backgroundColor="green"
          backgroundImage="./assets/images/portrait.png"
        />
        <Surface
          width={CHILD_SIZE}
          height={CHILD_SIZE}
          backgroundSize="cover"
          backgroundColor="green"
          backgroundImage="./assets/images/robot.png"
        />
      </Surface>
    </Canvas>
  );
}
