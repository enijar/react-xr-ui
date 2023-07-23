import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Intersection } from "three";

type TextProps = (typeof Text)["defaultProps"];

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

export type ValueArray = [topLeft?: number, topRight?: number, bottomRight?: number, bottomLeft?: number];

export type Fn = (mesh: THREE.Group, intersections: Intersection[]) => void;

export type LayerProps = GroupProps & {
  depthTest?: boolean;
  depthWrite?: boolean;
  zIndex?: number;
  visible?: boolean;
  autoLayout?: boolean;
  width?: number | string;
  height?: number | string;
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
  justifyContent?: "start" | "center" | "end" | "space-between" | "space-around";
  gap?: number;
  overflow?: "hidden" | "auto" | "visible";
  textContent?: string;
  textAlign?: TextProps["anchorX"];
  justifyText?: boolean;
  verticalAlign?: TextProps["anchorY"];
  color?: string;
  fontFamily?: string;
  fontSize?: number | `${number}px`;
  fontWeight?: string;
  lineHeight?: number;
  childIndex?: number;
  detail?: number;
  onLayout?: () => void;
  onMove?: Fn;
  onOver?: Fn;
  onOut?: Fn;
  onDown?: Fn;
  onUp?: Fn;
};

export type LayerRef = {
  group: THREE.Group;
};

export type XrUiContextType = {
  fontFamily: string;
  depthTest: boolean;
  pointer: {
    down: boolean;
    vector: THREE.Vector2;
  };
};
