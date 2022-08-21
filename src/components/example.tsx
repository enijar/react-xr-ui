import React from "react";
import { BoxLineGeometry } from "three/examples/jsm/geometries/BoxLineGeometry";
import { DefaultXRControllers, VRCanvas as Canvas } from "@react-three/xr";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

type Props = {
  children?: React.ReactNode;
};

export default function Example({ children }: Props) {
  const room = React.useMemo(() => {
    return new BoxLineGeometry(6, 6, 6, 10, 10, 10).translate(0, 3, 0);
  }, []);

  return (
    <Canvas legacy flat linear gl={{ alpha: false }}>
      {/** Background, cameras, controls and lights */}
      <color args={["#333333"]} attach="background" />
      <lineSegments geometry={room}>
        <lineBasicMaterial color="#c0c0c0" />
      </lineSegments>
      <PerspectiveCamera makeDefault position={[0, 1.6, 0]} />
      <OrbitControls makeDefault target={[0, 1, -1.8]} />
      <ambientLight />
      <DefaultXRControllers />

      <group position={[0, 1, -1.88]}>{children}</group>
    </Canvas>
  );
}
