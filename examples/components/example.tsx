import React from "react";
import { BoxLineGeometry } from "three/examples/jsm/geometries/BoxLineGeometry";
import { Canvas, useFrame } from "@react-three/fiber";
import { Controllers, useXR, useXREvent, XR, XRButton } from "@react-three/xr";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { update, interactive } from "react-xr-ui";

type Props = {
  children?: React.ReactNode;
};

function Scene({ children }: Props) {
  const controllers = useXR((state) => state.controllers);

  useFrame((state) => {
    update(state, controllers);
  });

  React.useEffect(() => {
    return interactive.create();
  }, []);

  useXREvent("selectstart", () => {
    interactive.enabled = true;
    interactive.pointerDown = true;
    interactive.cleanDown = true;
  });

  useXREvent("selectend", () => {
    interactive.pointerDown = false;
    interactive.cleanUp = true;
  });

  return <>{children}</>;
}

export default function Example({ children }: Props) {
  const room = React.useMemo(() => {
    return new BoxLineGeometry(6, 6, 6, 10, 10, 10).translate(0, 3, 0);
  }, []);

  return (
    <>
      <Canvas legacy flat linear gl={{ alpha: false }}>
        <XR>
          {/** Background, cameras, controls and lights */}
          <color args={["#333333"]} attach="background" />
          <lineSegments geometry={room}>
            <lineBasicMaterial color="#c0c0c0" />
          </lineSegments>
          <PerspectiveCamera makeDefault position={[0, 1.6, 0]} />
          <OrbitControls makeDefault target={[0, 1, -1.8]} />
          <ambientLight />
          <Controllers />

          <Scene>
            <group position={[0, 1, -1.88]}>{children}</group>
          </Scene>
        </XR>
      </Canvas>
      <XRButton
        style={{
          position: "absolute",
          bottom: "1em",
          color: "black",
          left: "50%",
          translate: "-50%",
          padding: "0.5em 1em",
          cursor: "pointer",
        }}
        mode="VR"
        sessionInit={{
          optionalFeatures: [
            "local-floor",
            "bounded-floor",
            "hand-tracking",
            "layers",
          ],
        }}
      >
        Enter Immersive VR
      </XRButton>
    </>
  );
}
