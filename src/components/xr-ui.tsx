import React from "react";
import { XrUiContextType } from "../types";

export const XrUiContext = React.createContext<XrUiContextType>({
  fontFamily: "https://themes.googleusercontent.com/static/fonts/roboto/v9/zN7GBFwfMP4uA6AR0HCoLQ.ttf",
  depthTest: true,
  premultiplyAlpha: true,
});

type Props = {
  children?: React.ReactNode;
  fontFamily?: XrUiContextType["fontFamily"];
  depthTest?: XrUiContextType["depthTest"];
  premultiplyAlpha?: XrUiContextType["premultiplyAlpha"];
};

export default function XrUi({
  children,
  fontFamily,
  depthTest = true,
  premultiplyAlpha = false,
}: Props) {
  return (
    <XrUiContext.Provider
      value={{
        fontFamily,
        depthTest,
        premultiplyAlpha,
      }}
    >
      {children}
    </XrUiContext.Provider>
  );
}
