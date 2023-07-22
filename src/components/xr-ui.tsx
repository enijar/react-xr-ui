import React from "react";
import { XrUiContextType } from "../types";

export const XrUiContext = React.createContext<XrUiContextType>({
  fontFamily: "https://drei.pmnd.rs/sb-common-assets/nunito-sans-regular.woff2",
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
