import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import Example from "@/components/example";
import { Layer, LayerRef } from "react-xr-ui";
import ViewCode from "@/components/view-code";

function AnimatedLayer() {
  const layerRef = React.useRef<LayerRef | null>(null);

  useFrame(() => {
    const layer = layerRef.current;
    if (layer === null) return;
    const t = Date.now() / 500;
    layer.setAttrs((attrs) => {
      return { ...attrs, opacity: (1 + Math.sin(t)) / 2 };
    });
  });

  return (
    <Layer
      ref={layerRef}
      width={1}
      height={1}
      backgroundColor="crimson"
      borderRadius={0.1}
      borderWidth={0.02}
      borderColor="#222222"
      backgroundPosition={[0.5, 0.5]}
    />
  );
}

export default function LayerApi() {
  return (
    <>
      <Example>
        <AnimatedLayer />
      </Example>
      <ViewCode pathname="layer-api" />
    </>
  );
}
