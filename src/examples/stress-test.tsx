import React from "react";
import { Layer } from "../../lib";
import { createPortal, useThree } from "@react-three/fiber";
import useWorldSize from "@/hooks/use-world-size";
import Example from "@/components/example";

function Scene() {
  const camera = useThree((state) => state.camera);
  const worldSize = useWorldSize();

  return (
    <>
      {createPortal(
        <group position-z={-5}>
          <Layer
            width={worldSize.width}
            height={worldSize.height}
            backgroundColor="#494957"
            alignItems="start"
          >
            <Layer
              alignItems="center"
              justifyContent="center"
              width={worldSize.width}
              height={0.5}
              backgroundColor="rgba(255, 0, 0, 0.5)"
            >
              {/*  */}
            </Layer>
          </Layer>
        </group>,
        camera
      )}
    </>
  );
}

export default function StressTest() {
  return (
    <Example>
      <Scene />
    </Example>
  );
}
