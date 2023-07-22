import React from "react";
import * as THREE from "three";

type Props = {
  children: React.ReactNode;
  mask: {
    stencilWrite: boolean;
    stencilRef: number;
    stencilFunc: THREE.StencilFunc;
    stencilFail: THREE.StencilOp;
    stencilZFail: THREE.StencilOp;
    stencilZPass: THREE.StencilOp;
  };
};

export default function Scroller({ children, mask }: Props) {
  const groupRef = React.useRef<THREE.Group>(null);

  React.useEffect(() => {
    const group = groupRef.current;
    if (group === null) return;
    group.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      if (!(child.material instanceof THREE.Material)) return;
      child.material.stencilFail = mask.stencilFail;
      child.material.stencilFunc = mask.stencilFunc;
      child.material.stencilRef = mask.stencilRef;
      child.material.stencilWrite = mask.stencilWrite;
      child.material.stencilZFail = mask.stencilZFail;
      child.material.stencilZPass = mask.stencilZPass;
      child.material.needsUpdate = true;
    });
  }, [mask]);

  return <group ref={groupRef}>{children}</group>;
}
