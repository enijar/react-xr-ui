import React from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import useRenderOrder from "@/lib/hooks/use-render-order";
import useRenderKey from "@/lib/hooks/use-render-key";
import vertexShader from "@/lib/components/surface/shader/vertex.glsl";
import fragmentShader from "@/lib/components/surface/shader/fragment.glsl";

type Props = {
  children?: React.ReactNode;
  width?: number;
  height?: number;
  backgroundColor?: THREE.ColorRepresentation;
  backgroundImage?: string;
  backgroundSize?: "cover" | "contain";
  tint?: THREE.ColorRepresentation;
};

export default function Surface({
  children,
  width = 1,
  height = 1,
  backgroundColor = "black",
  backgroundImage,
  backgroundSize,
  tint,
}: Props) {
  const gl = useThree((state) => state.gl);

  // Set geometry size from `width` and `height` props
  const size = React.useMemo(() => {
    return { width, height };
  }, [width, height]);

  // Set material texture from `backgroundImage` prop
  const [texture, setTexture] = React.useState<THREE.Texture>(undefined);
  React.useMemo(() => {
    if (backgroundImage === undefined) return;
    new THREE.TextureLoader().loadAsync(backgroundImage).then(setTexture);
  }, [backgroundImage]);

  // Set material color from `backgroundColor` prop
  // Don't set a color if `texture` is defined and `tint` prop is undefined
  const color = React.useMemo(() => {
    if (texture === undefined) return backgroundColor;
    if (tint !== undefined) return tint;
    return undefined;
  }, [texture, backgroundColor, tint]);

  const uniforms = React.useMemo(() => {
    let mode = 0;
    if (texture !== undefined) {
      mode = 1;
    }
    if (tint !== undefined) {
      mode = 2;
    }
    return {
      uMode: { value: mode },
      uTexture: { value: texture },
      uColor: { value: new THREE.Color(color) },
      uTint: { value: new THREE.Color(tint) },
    };
  }, [texture, color, tint]);

  const renderOrder = useRenderOrder();
  const key = useRenderKey([texture, color, tint]);

  return (
    <group key={key}>
      <mesh renderOrder={renderOrder}>
        <planeBufferGeometry args={[size.width, size.height]} />
        <shaderMaterial
          key={`${vertexShader}${fragmentShader}`}
          transparent={true}
          depthWrite={false}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
      {children}
    </group>
  );
}
