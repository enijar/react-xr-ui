import React from "react";
import * as THREE from "three";
import { useMask } from "@react-three/drei";
import { LayerProps } from "react-xr-ui";

type Props = {
  children: React.ReactNode;
  overflow: LayerProps["overflow"];
  maskId: number;
};

export default function Scroller({ children, overflow, maskId }: Props) {
  const maskEnabled = React.useMemo(() => {
    return ["hidden", "auto"].includes(overflow);
  }, [overflow]);

  const overflowMask = useMask(maskEnabled ? maskId : 0);

  const groupRef = React.useRef<THREE.Group>(null);

  React.useEffect(() => {
    const group = groupRef.current;
    if (group === null) return;
    group.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      if (!(child.material instanceof THREE.Material)) return;
      child.material.stencilWrite = maskEnabled ? overflowMask.stencilWrite : false;
      child.material.stencilFail = overflowMask.stencilFail;
      child.material.stencilFunc = overflowMask.stencilFunc;
      child.material.stencilRef = overflowMask.stencilRef;
      child.material.stencilZFail = overflowMask.stencilZFail;
      child.material.stencilZPass = overflowMask.stencilZPass;
      child.material.needsUpdate = true;
    });
  }, [overflowMask, maskEnabled]);

  return <group ref={groupRef}>{children}</group>;
}
