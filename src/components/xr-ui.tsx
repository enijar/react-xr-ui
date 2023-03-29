import React from "react";
import { XrUiContextType } from "../types";

export const XrUiContext = React.createContext<XrUiContextType>({
  layerResolution: 1024,
  fontFamily: "system-ui, sans-serif",
  optimizedRendering: false,
});

type Props = {
  children?: React.ReactNode;
  layerResolution?: number;
  fontFamily?: string;
  optimizedRendering?: boolean;
};

export default function XrUi({
  children,
  layerResolution = 1024,
  fontFamily,
  optimizedRendering = false,
}: Props) {
  return (
    <XrUiContext.Provider
      value={{ layerResolution, fontFamily, optimizedRendering }}
    >
      {children}
    </XrUiContext.Provider>
  );
}
