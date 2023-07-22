import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import Example from "@/components/example";
import { Layer, LayerRef } from "react-xr-ui";
import ViewCode from "@/components/view-code";

function hex2rgb(hex: string): [r: number, g: number, b: number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result === null) {
    return [0, 0, 0];
  }
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}

function rgbToHex([r, g, b]: [r: number, g: number, b: number]): string {
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

function AnimatedBorders() {
  const layerRef = React.useRef<LayerRef>(null);

  const [borderRadius, setBorderRadius] = React.useState(0);
  const [backgroundColor, setBackgroundColor] = React.useState("#ffffff");

  const colors = React.useMemo(() => {
    return [hex2rgb("#ff0000"), hex2rgb("#0000ff")];
  }, []);

  useFrame(() => {
    const layer = layerRef.current;
    if (layer === null) return;
    const { mapLinear } = THREE.MathUtils;
    const now = Date.now();
    const speed = 0.001;
    const delta = (1 + Math.sin(now * speed)) / 2;
    layer.group.position.x = mapLinear(delta, 0, 1, -0.5, 0.5);
    layer.material.needsUpdate = true;

    const diff: [r: number, g: number, b: number] = [
      Math.abs(colors[0][0] * (1 - delta) - colors[1][0] * delta),
      Math.abs(colors[0][1] * (1 - delta) - colors[1][1] * delta),
      Math.abs(colors[0][2] * (1 - delta) - colors[1][2] * delta),
    ];

    setBackgroundColor(rgbToHex(diff));
    setBorderRadius(() => {
      return mapLinear(delta, 0, 1, 0, 0.5);
    });
  });

  return (
    <Layer
      ref={layerRef}
      width={1}
      height={1}
      backgroundColor={backgroundColor}
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
