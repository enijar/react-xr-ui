import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

export default function Layout() {
  return (
    <Canvas flat linear>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls makeDefault />
      <ambientLight />
      <mesh>
        <boxBufferGeometry />
        <meshBasicMaterial color="crimson" />
      </mesh>
    </Canvas>
  );
}
