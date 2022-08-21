import { GroupProps } from "@react-three/fiber";

export type Child = {
  width: number;
  height: number;
  index: number;
  uuid: string;
};

export type LayerContextType = {
  currentChildren: Child[];
  addChild: (child: Child) => void;
  removeChild: (uuid: Child["uuid"]) => void;
};

export type Size = {
  width: number;
  height: number;
};

export type BorderArray = [
  topLeft?: number,
  topRight?: number,
  bottomRight?: number,
  bottomLeft?: number
];

export type LayerProps = GroupProps & {
  zIndex?: number;
  visible?: boolean;
  autoLayout?: boolean;
  resolution?: number;
  width?: number;
  height?: number;
  opacity?: number;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: "stretch" | "contain" | "cover";
  backgroundPosition?: [left: number, top: number];
  borderRadius?: number | BorderArray;
  borderWidth?: number;
  borderColor?: string;
  flexDirection?: "row" | "column";
  alignItems?: "start" | "center" | "end";
  justifyContent?:
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around";
  gap?: number;
  childIndex?: number;
};
