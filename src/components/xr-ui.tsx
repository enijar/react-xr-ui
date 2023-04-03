import React from "react";
import { XrUiContextType } from "../types";

export const XrUiContext = React.createContext<XrUiContextType>({
  layerResolution: 1024,
  fontFamily: "system-ui, sans-serif",
  optimizedRendering: false,
  alphaTest: 0,
});

type Props = {
  children?: React.ReactNode;
  layerResolution?: XrUiContextType["layerResolution"];
  fontFamily?: XrUiContextType["fontFamily"];
  optimizedRendering?: XrUiContextType["optimizedRendering"];
  alphaTest?: XrUiContextType["alphaTest"];
};

export default function XrUi({
  children,
  layerResolution = 1024,
  fontFamily,
  optimizedRendering = false,
  alphaTest,
}: Props) {
  return (
    <XrUiContext.Provider
      value={{ layerResolution, fontFamily, optimizedRendering, alphaTest }}
    >
      {children}
    </XrUiContext.Provider>
  );
}
