import React from "react";
import { XrUiContextType } from "../types";

export const XrUiContext = React.createContext<XrUiContextType>({
  layerResolution: 1024,
  fontFamily: "system-ui, sans-serif",
});

type Props = {
  children?: React.ReactNode;
  layerResolution?: number;
  fontFamily?: string;
};

export default function XrUi({
  children,
  layerResolution = 1024,
  fontFamily,
}: Props) {
  return (
    <XrUiContext.Provider value={{ layerResolution, fontFamily }}>
      {children}
    </XrUiContext.Provider>
  );
}
