import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";
import { align, vAlign } from "canvas-txt";
import React from "react";

export type Child = {
  width: number;
  height: number;
  autoLayout: boolean;
  index: number;
  uuid: string;
};

export type LayerContextType = {
  parentUuid: string | null;
  parentSize: Size;
  currentChildren: Child[];
  renderOrder: number;
  addChild: (child: Child) => void;
  removeChild: (uuid: Child["uuid"]) => void;
};

export type Size = {
  width: number;
  height: number;
};

export type ValueArray = [
  topLeft?: number,
  topRight?: number,
  bottomRight?: number,
  bottomLeft?: number
];

export type LayerProps = GroupProps & {
  depthTest?: boolean;
  depthWrite?: boolean;
  optimizedRendering?: boolean;
  zIndex?: number;
  visible?: boolean;
  autoLayout?: boolean;
  premultiplyAlpha?: boolean;
  resolution?: number;
  width?: number | string;
  height?: number | string;
  alphaTest?: number;
  aspectRatio?: number;
  opacity?: number;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: "stretch" | "contain" | "cover";
  backgroundPosition?: [left: number, top: number];
  padding?: number | ValueArray;
  borderRadius?: number | ValueArray;
  borderWidth?: number;
  borderColor?: string;
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  alignItems?: "start" | "center" | "end";
  justifyContent?:
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around";
  gap?: number;
  textContent?: string;
  textAlign?: typeof align;
  justifyText?: boolean;
  verticalAlign?: typeof vAlign;
  color?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  lineHeight?: number;
  childIndex?: number;
  imageRendering?: "crisp-edges" | "pixelated" | string;
  imageSmoothingEnabled?: boolean;
  textRendering?:
    | "auto"
    | "optimizeSpeed"
    | "optimizeLegibility"
    | "geometricPrecision"
    | "inherit";
  dpr?: number;
  onLayout?: () => void;
};

export type Attrs = Partial<{
  opacity: number;
  backgroundColor: string;
}>;

export type LayerRef = {
  group: THREE.Group;
  mesh: THREE.Mesh;
  material: THREE.MeshBasicMaterial;
  setAttrs: React.Dispatch<React.SetStateAction<Attrs>>;
};

export type XrUiContextType = {
  layerResolution: number;
  fontFamily: string;
  optimizedRendering: boolean;
  alphaTest: number;
  depthTest: boolean;
  premultiplyAlpha: boolean;
};
