import React from "react";
import type { Intersection } from "three";
import { Interactive, useXR, XRInteractionEvent } from "@react-three/xr";
import { ThreeEvent } from "@react-three/fiber";

type Fn = (intersection: Intersection, intersections: Intersection[]) => void;

type Props = {
  children: React.ReactNode;
  onMove?: Fn;
  onOver?: Fn;
  onOut?: Fn;
  onDown?: Fn;
  onUp?: Fn;
  enabled?: boolean;
};

export default function Interaction({ children, onMove, onOver, onOut, onDown, onUp, enabled = true }: Props) {
  const isPresenting = useXR((state) => state.isPresenting);

  const handleVrInteraction = React.useCallback(
    (fn?: Fn) => {
      return (event: XRInteractionEvent) => {
        if (!isPresenting) return;
        if (!enabled) return;
        if (!fn) return;
        const intersection = event.intersections.find((intersection) => {
          return intersection.object.name === "react-xr-ui-layer-mesh";
        });
        fn(intersection, event.intersections);
      };
    },
    [isPresenting, enabled, onDown, onUp, onMove, onOver, onOut],
  );

  const handleWebInteraction = React.useCallback(
    (fn?: Fn) => {
      return (event: ThreeEvent<PointerEvent>) => {
        if (isPresenting) return;
        if (!enabled) return;
        if (!fn) return;
        const intersection = event.intersections.find((intersection) => {
          return intersection.object.name === "react-xr-ui-layer-mesh";
        });
        fn(intersection, event.intersections);
      };
    },
    [isPresenting, enabled, onDown, onUp, onMove, onOver, onOut],
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
