import React from "react";
import * as THREE from "three";
import { XrUiContextType } from "../types";
import { useThree } from "@react-three/fiber";

export const XrUiContext = React.createContext<XrUiContextType>({
  fontFamily: "https://themes.googleusercontent.com/static/fonts/roboto/v9/zN7GBFwfMP4uA6AR0HCoLQ.ttf",
  depthTest: true,
  pointer: {
    down: false,
    vector: new THREE.Vector2(Infinity, Infinity),
  },
});

type Props = {
  children?: React.ReactNode;
  fontFamily?: XrUiContextType["fontFamily"];
  depthTest?: XrUiContextType["depthTest"];
  pointer?: XrUiContextType["pointer"];
};

export default function XrUi({ children, fontFamily, depthTest = true }: Props) {
  const camera = useThree((state) => state.camera);

  const pointer = React.useMemo(() => {
    return {
      down: false,
      vector: new THREE.Vector2(Infinity, Infinity),
    };
  }, []);

  React.useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    function onResize() {
      width = window.innerWidth;
      height = window.innerHeight;
    }

    function onMouseMove(event: MouseEvent) {
      pointer.vector.set((event.offsetX / width) * 2 - 1, -(event.offsetY / height) * 2 + 1);
    }

    function onMouseDown() {
      pointer.down = true;
    }

    function onMouseUp() {
      pointer.down = false;
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [camera]);

  return (
    <XrUiContext.Provider
      value={{
        fontFamily,
        depthTest,
        pointer,
      }}
    >
      {children}
    </XrUiContext.Provider>
  );
}
