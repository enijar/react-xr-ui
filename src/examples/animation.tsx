import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import Example from "@/components/example";
import { Layer, LayerRef } from "../../lib";
import ViewCode from "@/components/view-code";

function AnimatedBorders() {
  const layerRef = React.useRef<LayerRef>(null);

  const [borderRadius, setBorderRadius] = React.useState(0);

  useFrame(() => {
    const layer = layerRef.current;
    if (layer === null) return;
    const { mapLinear } = THREE.MathUtils;
    const now = Date.now();
    const speed = 0.001;
    const delta = (1 + Math.sin(now * speed)) / 2;
    layer.group.position.x = mapLinear(delta, 0, 1, -0.5, 0.5);
    setBorderRadius(() => {
      return mapLinear(delta, 0, 1, 0, 0.5);
    });
  });

  React.useEffect(() => {
    const layer = layerRef.current;
    if (layer === null) return;
    layer.test();
  }, []);

  return (
    <Layer
      ref={layerRef}
      width={1}
      height={1}
      backgroundColor="crimson"
      borderRadius={borderRadius}
      borderWidth={0.02}
      borderColor="#222222"
      backgroundPosition={[0.5, 0.5]}
    />
  );
}

export default function Animation() {
  return (
    <>
      <Example>
        <AnimatedBorders />
      </Example>
      <ViewCode pathname="animation" />
    </>
  );
}
