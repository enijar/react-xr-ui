import * as React from "react";
import * as THREE from "three";
// @ts-ignore
import { Text as TextMeshImpl, preloadFont } from "troika-three-text";
import { ReactThreeFiber, useThree } from "@react-three/fiber";
import { suspend } from "suspend-react";
import { mergeRefs } from "react-merge-refs";
import useRenderOrder from "@/lib/hooks/use-render-order";
import useRenderKey from "@/lib/hooks/use-render-key";
import Surface from "@/lib/components/surface";
import surfaces from "@/lib/state/surfaces";
import { SurfaceContext } from "@/lib/context/surface-context";

type Props = JSX.IntrinsicElements["mesh"] & {
  children: React.ReactNode;
  characters?: string;
  color?: ReactThreeFiber.Color;
  fontSize?: number;
  maxWidth?: number;
  lineHeight?: number;
  letterSpacing?: number;
  textAlign?: "left" | "right" | "center" | "justify";
  fontUrl?: string;
  anchorX?: number | "left" | "center" | "right";
  anchorY?:
    | number
    | "top"
    | "top-baseline"
    | "middle"
    | "bottom-baseline"
    | "bottom";
  clipRect?: [number, number, number, number];
  depthOffset?: number;
  direction?: "auto" | "ltr" | "rtl";
  overflowWrap?: "normal" | "break-word";
  whiteSpace?: "normal" | "overflowWrap" | "overflowWrap";
  outlineWidth?: number | string;
  outlineOffsetX?: number | string;
  outlineOffsetY?: number | string;
  outlineBlur?: number | string;
  outlineColor?: ReactThreeFiber.Color;
  outlineOpacity?: number;
  strokeWidth?: number | string;
  strokeColor?: ReactThreeFiber.Color;
  strokeOpacity?: number;
  fillOpacity?: number;
  debugSDF?: boolean;
  onSync?: (troika: TextMeshImpl) => void;
};

function Text(
  {
    anchorX = "center",
    anchorY = "middle",
    fontUrl,
    children,
    characters,
    onSync,
    ...props
  }: Props,
  forwardedRef: React.ForwardedRef<THREE.Group>
) {
  const invalidate = useThree(({ invalidate }) => invalidate);
  const [troikaMesh] = React.useState(() => new TextMeshImpl());

  const [nodes, text] = React.useMemo(() => {
    const n: React.ReactNode[] = [];
    let t = "";
    React.Children.forEach(children, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        t += child;
      } else {
        n.push(child);
      }
    });
    return [n, t];
  }, [children]);

  suspend(
    () => new Promise((res) => preloadFont({ fontUrl, characters }, res)),
    ["troika-text", fontUrl, characters]
  );

  const groupRef = React.useRef<THREE.Group>(null);

  const renderOrder = useRenderOrder();
  const key = useRenderKey([children]);

  React.useMemo(() => {
    troikaMesh.renderOrder = renderOrder + 2;
    const material = troikaMesh.material as THREE.MeshBasicMaterial;
    material.side = THREE.FrontSide;
    material.depthWrite = false;
    material.needsUpdate = true;
  }, [troikaMesh, renderOrder]);

  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useLayoutEffect(
    () =>
      void troikaMesh.sync(() => {
        invalidate();
        const width = troikaMesh.geometry.boundingBox.max.x * 2;
        const height = troikaMesh.geometry.boundingBox.max.y * 2;
        setSize({ width, height });
        if (onSync) onSync(troikaMesh);
      })
  );

  React.useEffect(() => {
    return () => troikaMesh.dispose();
  }, [troikaMesh]);

  const id = React.useId();

  const { parentId } = React.useContext(SurfaceContext);

  React.useEffect(() => {
    const group = groupRef.current;
    if (group === null) return;
    if (parentId === undefined) return;
    if (!surfaces.hasOwnProperty(parentId)) {
      surfaces[parentId] = [];
    }
    surfaces[parentId].push({ ...size, id });
  }, [parentId, size, id]);

  return (
    <Surface
      width={size.width}
      height={size.height}
      ref={groupRef}
      key={key}
      backgroundOpacity={0}
    >
      <primitive
        object={troikaMesh}
        ref={mergeRefs([groupRef, forwardedRef])}
        font={fontUrl}
        text={text}
        anchorX={anchorX}
        anchorY={anchorY}
        {...props}
      >
        {nodes}
      </primitive>
    </Surface>
  );
}

const Component = React.forwardRef(Text);

Component.displayName = "ui-text";

export default Component;
