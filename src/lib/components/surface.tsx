import React from "react";
import * as THREE from "three";
import useRenderOrder from "@/lib/hooks/use-render-order";
import useRenderKey from "@/lib/hooks/use-render-key";
import { useThree } from "@react-three/fiber";

type Props = {
  children?: React.ReactNode;
  width?: number;
  height?: number;
  backgroundColor?: THREE.ColorRepresentation;
  backgroundImage?: string;
  backgroundSize?: "cover" | "contain";
  zIndex?: number;
};

export default function Surface({
  children,
  width = 1,
  height = 1,
  backgroundColor = "black",
  backgroundImage,
  backgroundSize,
  zIndex = 0,
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

  // Set texture `anisotropy` to max available (prevents blurriness)
  // when viewing at an angle
  React.useMemo(() => {
    if (texture === undefined) return;
    texture.anisotropy = gl.capabilities.getMaxAnisotropy();
  }, [texture, gl]);

  const [surfaceRatio, imageRatioX, imageRatioY] = React.useMemo(() => {
    const surfaceRatio = size.width / size.height;
    if (texture === undefined) {
      return [surfaceRatio, surfaceRatio, surfaceRatio];
    }
    const imageRatioX = texture.image.width / texture.image.height;
    const imageRatioY = texture.image.height / texture.image.width;
    return [surfaceRatio, imageRatioX, imageRatioY];
  }, [texture, size]);

  const planes = React.useMemo(() => {
    const plane = new THREE.Plane(new THREE.Vector3(), 1);
    return [plane.clone(), plane.clone(), plane.clone(), plane.clone()];
  }, []);

  const [textureSize, textureClippingPlanes] = React.useMemo(() => {
    if (texture === undefined) return [size, planes];

    const newSize = { ...size };

    // @todo find a way to simplify this

    if (backgroundSize === "contain") {
      if (imageRatioX >= surfaceRatio) {
        newSize.width = size.width;
        newSize.height = newSize.width * imageRatioY;
      } else {
        newSize.height = size.height;
        newSize.width = newSize.height * imageRatioX;
      }
    }

    if (backgroundSize === "cover") {
      if (imageRatioX >= surfaceRatio) {
        newSize.height = size.height;
        newSize.width = newSize.height * imageRatioX;
      } else {
        newSize.width = size.width;
        newSize.height = newSize.width * imageRatioY;
      }
    }

    planes[0].set(new THREE.Vector3(0, -1, 0), size.height * 0.5);
    planes[1].set(new THREE.Vector3(1, 0, 0), size.width * 0.5);
    planes[2].set(new THREE.Vector3(0, 1, 0), size.height * 0.5);
    planes[3].set(new THREE.Vector3(-1, 0, 0), size.width * 0.5);

    return [newSize, planes];
  }, [
    planes,
    texture,
    size,
    backgroundSize,
    imageRatioX,
    imageRatioY,
    surfaceRatio,
  ]);

  const renderOrder = useRenderOrder();
  const key = useRenderKey([texture]);

  return (
    <group key={key}>
      <mesh renderOrder={renderOrder + zIndex}>
        <planeBufferGeometry args={[size.width, size.height]} />
        <meshBasicMaterial
          color={backgroundColor}
          transparent={true}
          depthWrite={false}
        />
      </mesh>
      <mesh visible={texture !== undefined} renderOrder={renderOrder + zIndex}>
        <planeBufferGeometry args={[textureSize.width, textureSize.height]} />
        <meshBasicMaterial
          map={texture}
          transparent={true}
          depthWrite={false}
          clippingPlanes={textureClippingPlanes}
        />
      </mesh>
      {children}
    </group>
  );
}
