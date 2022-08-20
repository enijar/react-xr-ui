import React from "react";
import * as THREE from "three";
import { GroupProps, useFrame } from "@react-three/fiber";

type BorderArray = [
  topLeft?: number,
  topRight?: number,
  bottomRight?: number,
  bottomLeft?: number
];

type Props = GroupProps & {
  zIndex?: number;
  visible?: boolean;
  resolution?: number;
  width?: number;
  height?: number;
  opacity?: number;
  backgroundColor?: string;
  borderRadius?: number | BorderArray;
  borderWidth?: number;
  borderColor?: string;
};

export default function Layer({
  zIndex = 0,
  resolution = 512,
  visible = true,
  width = 1,
  height = 1,
  opacity = 1,
  backgroundColor = "transparent",
  borderRadius = 0,
  borderWidth = 0,
  borderColor = "transparent",
  ...props
}: Props) {
  // Create 2d canvas context
  const ctx = React.useMemo<CanvasRenderingContext2D>(() => {
    const canvas = document.createElement("canvas");
    return canvas.getContext("2d");
  }, []);

  // Create canvas texture with the newly created canvas;
  // this will be used as the texture for the plane
  const canvasTexture = React.useMemo(() => {
    return new THREE.CanvasTexture(ctx.canvas);
  }, [ctx.canvas]);

  // Set canvas size
  React.useMemo(() => {
    ctx.canvas.width = Math.max(1, Math.floor(width * resolution));
    ctx.canvas.height = Math.max(1, Math.floor(height * resolution));
  }, [ctx.canvas, width, height, resolution]);

  useFrame(() => {
    // Useful vars
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const d2r = Math.PI / 180; // degrees to radians

    ctx.clearRect(0, 0, w, h);

    // Border radius
    {
      const array = borderRadius as BorderArray;
      const number = borderRadius as number;
      const [tl, tr, br, bl] = array ?? [number, number, number, number];
      ctx.beginPath();
      ctx.moveTo(tl, 0);
      ctx.lineTo(w - tr, 0);
      ctx.arc(w - tr, tr, tr, d2r * 270, d2r * 360);
      ctx.lineTo(w, h - br);
      ctx.arc(w - br, h - br, br, 0, d2r * 90);
      ctx.lineTo(bl, h);
      ctx.arc(bl, h - bl, bl, d2r * 90, d2r * 180);
      ctx.lineTo(0, tl);
      ctx.arc(tl, tl, tl, d2r * 180, d2r * 270);
      ctx.closePath();
    }

    // Background fill and border stroke
    ctx.save();
    ctx.clip();
    ctx.fillStyle = backgroundColor;
    ctx.lineWidth = borderWidth * 2;
    ctx.fill();
    ctx.strokeStyle = borderColor;
    ctx.stroke();
    ctx.restore();

    // Make sure canvas texture gets updated
    canvasTexture.needsUpdate = true;
  });

  return (
    <group {...props}>
      <mesh renderOrder={zIndex} visible={visible}>
        <planeBufferGeometry args={[width, height]} />
        <meshBasicMaterial
          side={THREE.FrontSide}
          opacity={opacity}
          transparent={true}
          depthWrite={false}
          map={canvasTexture}
        />
      </mesh>
    </group>
  );
}
