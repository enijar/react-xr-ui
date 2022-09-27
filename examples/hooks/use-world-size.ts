import React from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useXR } from "@react-three/xr";

type Size = { width: number; height: number };

export default function useWorldSize(zOffset: number = 5): Size {
  const size = useThree((state) => state.size);
  const camera = useThree((state) => state.camera);
  const isPresenting = useXR((state) => state.isPresenting);

  return React.useMemo<Size>(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const vFov = (cam.fov * Math.PI) / 180;
    const height = 2 * Math.tan(vFov / 2) * zOffset;
    const aspect = size.width / size.height;
    const width = height * aspect;
    return { width, height };
  }, [camera, size, zOffset, isPresenting]);
}
