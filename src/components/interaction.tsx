import React from "react";
import type { Intersection } from "three";
import { Interactive, useXR, XRInteractionEvent } from "@react-three/xr";
import { ThreeEvent } from "@react-three/fiber";

type Props = {
  children: React.ReactNode;
  onMove?: (intersection: Intersection) => void;
  onOver?: (intersection: Intersection) => void;
  onOut?: (intersection: Intersection) => void;
  onDown?: (intersection: Intersection) => void;
  onUp?: (intersection: Intersection) => void;
  enabled?: boolean;
};

export default function Interaction({
  children,
  onMove,
  onOver,
  onOut,
  onDown,
  onUp,
  enabled = true,
}: Props) {
  const isPresenting = useXR((state) => state.isPresenting);

  const handleVrInteraction = React.useCallback(
    (fn?: (intersection: Intersection) => void) => {
      return (event: XRInteractionEvent) => {
        if (!isPresenting) return;
        if (!enabled) return;
        if (!fn) return;
        fn(event.intersection);
      };
    },
    [isPresenting, enabled, onDown, onUp, onMove, onOver, onOut]
  );

  const handleWebInteraction = React.useCallback(
    (fn?: (intersection: Intersection) => void) => {
      return (event: ThreeEvent<PointerEvent>) => {
        if (isPresenting) return;
        if (!enabled) return;
        if (!fn) return;
        event.stopPropagation();
        fn(event.intersections[0]);
      };
    },
    [isPresenting, enabled, onDown, onUp, onMove, onOver, onOut]
  );

  return (
    <Interactive
      onSelectStart={handleVrInteraction(onDown)}
      onSelectEnd={handleVrInteraction(onUp)}
      onMove={handleVrInteraction(onMove)}
      onHover={handleVrInteraction(onOver)}
      onBlur={handleVrInteraction(onOut)}
    >
      <group
        onPointerDown={handleWebInteraction(onDown)}
        onPointerUp={handleWebInteraction(onUp)}
        onPointerMove={handleWebInteraction(onMove)}
        onPointerOver={handleWebInteraction(onOver)}
        onPointerOut={handleWebInteraction(onOut)}
      >
        {children}
      </group>
    </Interactive>
  );
}
