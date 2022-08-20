import React from "react";
import * as THREE from "three";
import { GroupProps, useFrame, useThree } from "@react-three/fiber";

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
  backgroundImage?: string;
  backgroundSize?: "stretch" | "contain" | "cover";
  backgroundPosition?: [left: number, top: number];
  borderRadius?: number | BorderArray;
  borderWidth?: number;
  borderColor?: string;
};

const DEFAULT_BACKGROUND_POSITION: Props["backgroundPosition"] = [0, 0];

export default function Layer({
  zIndex = 0,
  resolution = 512,
  visible = true,
  width = 1,
  height = 1,
  opacity = 1,
  backgroundColor = "transparent",
  backgroundImage,
  backgroundSize,
  backgroundPosition = DEFAULT_BACKGROUND_POSITION,
  borderRadius = 0,
  borderWidth = 0,
  borderColor = "transparent",
  ...props
}: Props) {
  const gl = useThree((state) => state.gl);

  const materialRef = React.useRef<THREE.MeshBasicMaterial>(null);

  // Create 2d canvas context
  const ctx = React.useMemo<CanvasRenderingContext2D>(() => {
    const canvas = document.createElement("canvas");
    return canvas.getContext("2d");
  }, []);

  // Create canvas texture with the newly created canvas;
  // this will be used as the texture for the plane
  const canvasTexture = React.useMemo(() => {
    const canvasTexture = new THREE.CanvasTexture(ctx.canvas);
    canvasTexture.anisotropy = gl.capabilities.getMaxAnisotropy();
    return canvasTexture;
  }, [ctx.canvas, gl.capabilities]);

  // Set canvas size
  React.useMemo(() => {
    ctx.canvas.width = Math.max(1, Math.floor(width * resolution));
    ctx.canvas.height = Math.max(1, Math.floor(height * resolution));
  }, [ctx.canvas, width, height, resolution]);

  const images = React.useMemo(() => {
    const backgroundImage = new Image();
    return { backgroundImage };
  }, []);

  // Set source for background image
  React.useMemo(() => {
    images.backgroundImage.src = backgroundImage;
  }, [images.backgroundImage, backgroundImage]);

  useFrame(() => {
    // Useful vars
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const d2r = Math.PI / 180; // degrees to radians
    const res = (w + h) / 2;
    const { mapLinear } = THREE.MathUtils;

    ctx.globalCompositeOperation = "source-over";

    ctx.clearRect(0, 0, w, h);

    // Border radius
    {
      const isArray = Array.isArray(borderRadius);
      const array = borderRadius as BorderArray;
      const number = borderRadius as number;
      let [tl = 0, tr = 0, br = 0, bl = 0] = isArray
        ? array
        : [number, number, number, number];
      tl *= res;
      tr *= res;
      br *= res;
      bl *= res;
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

    ctx.globalAlpha = opacity;

    // Background color
    ctx.fillStyle = backgroundColor;
    ctx.lineWidth = borderWidth * res * 2;
    ctx.fill();

    // Background image
    if (backgroundImage !== undefined) {
      const x = backgroundPosition[0];
      const y = backgroundPosition[1];
      const ox = borderWidth * res;
      const oy = borderWidth * res;
      const sx = 0;
      const sy = 0;
      const sw = images.backgroundImage.width;
      const sh = images.backgroundImage.height;
      const ir = sw / sh;
      const cr = w / h;
      let dw = sw;
      let dh = sh;
      switch (backgroundSize) {
        case "stretch":
          dw = w;
          dh = h;
          break;
        case "contain":
          dw = w - ox * 2;
          dh = h - oy * 2;
          if (ir > cr) {
            dh = dw / ir;
          } else {
            dw = dh * ir;
          }
          break;
        case "cover":
          dw = w - ox * 2;
          dh = h - oy * 2;
          if (ir < cr) {
            dh = dw / ir;
          } else {
            dw = dh * ir;
          }
          break;
      }
      const dx = ox + mapLinear(x, 0, 1, 0, w - ox * 2 - dw);
      const dy = oy + mapLinear(y, 0, 1, 0, h - oy * 2 - dh);
      ctx.save();
      ctx.clip();
      ctx.drawImage(images.backgroundImage, sx, sy, sw, sh, dx, dy, dw, dh);
      ctx.restore();
    }

    // Fixes antialiasing issue
    ctx.globalCompositeOperation = "destination-out";
    ctx.stroke();
    ctx.globalCompositeOperation = "source-over";
    ctx.save();
    ctx.clip();

    ctx.strokeStyle = borderColor;
    // Border
    ctx.stroke();
    ctx.restore();

    // Make sure canvas texture gets updated
    canvasTexture.needsUpdate = true;

    const material = materialRef.current;
    if (material !== null) {
      material.needsUpdate = true;
    }
  });

  return (
    <group {...props}>
      <mesh renderOrder={zIndex} visible={visible}>
        <planeBufferGeometry args={[width, height]} />
        <meshBasicMaterial
          ref={materialRef}
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
