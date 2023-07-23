import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { XrUiContext } from "../components/xr-ui";
import type { Fn, LayerProps } from "../types";

export default function usePointerEvents(
  mask: THREE.Mesh | null,
  onMove: LayerProps["onMove"],
  onOver: LayerProps["onOver"],
  onOut: LayerProps["onOut"],
  onDown: LayerProps["onDown"],
  onUp: LayerProps["onUp"],
) {
  const xrUiContext = React.useContext(XrUiContext);

  const pointerOverFiredRef = React.useRef(false);
  const pointerOutFiredRef = React.useRef(false);
  const pointerDownFiredRef = React.useRef(false);
  const pointerUpFiredRef = React.useRef(false);
  const pointerMovePositionRef = React.useRef(new THREE.Vector2());

  useFrame(({ camera, raycaster }) => {
    if (mask === null) return;

    raycaster.setFromCamera(xrUiContext.pointer.vector, camera);
    const intersections = raycaster.intersectObject(mask, true);
    const hit = intersections.length > 0;

    const isPointerChanged = () => {
      return (
        xrUiContext.pointer.vector.x !== pointerMovePositionRef.current.x ||
        xrUiContext.pointer.vector.y !== pointerMovePositionRef.current.y
      );
    };

    const handleEvent = (
      condition: boolean,
      firedRef: React.MutableRefObject<boolean>,
      oppositeFiredRef: React.MutableRefObject<boolean>,
      eventHandler: Fn,
    ) => {
      if (condition && !firedRef.current) {
        firedRef.current = true;
        oppositeFiredRef.current = false;
        eventHandler?.(intersections[0], intersections);
      }
    };

    handleEvent(hit && !pointerOverFiredRef.current, pointerOverFiredRef, pointerOutFiredRef, onOver);
    handleEvent(
      hit && !pointerDownFiredRef.current && xrUiContext.pointer.down,
      pointerDownFiredRef,
      pointerUpFiredRef,
      onDown,
    );
    handleEvent(
      hit && !pointerUpFiredRef.current && pointerDownFiredRef.current && !xrUiContext.pointer.down,
      pointerUpFiredRef,
      pointerDownFiredRef,
      onUp,
    );
    handleEvent(!hit && pointerOverFiredRef.current, pointerOutFiredRef, pointerOverFiredRef, onOut);

    // Pointer move event
    if (hit && isPointerChanged()) {
      pointerMovePositionRef.current.copy(xrUiContext.pointer.vector);
      onMove?.(intersections[0], intersections);
    }
  });
}
