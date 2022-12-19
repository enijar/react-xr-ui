import React from "react";
import { XrUiContextType } from "../types";

export const XrUiContext = React.createContext<XrUiContextType>({
  layerResolution: 1024,
});

type Props = {
  children?: React.ReactNode;
  layerResolution?: number;
};

export default function XrUi({ children, layerResolution = 1024 }: Props) {
  return (
    <XrUiContext.Provider value={{ layerResolution }}>
      {children}
    </XrUiContext.Provider>
  );
}
