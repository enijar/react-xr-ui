import React from "react";
import * as THREE from "three";
import { GroupProps, useFrame, useThree } from "@react-three/fiber";

type Child = {
  width: number;
  height: number;
  index: number;
  uuid: string;
};

type LayerContextType = {
  currentChildren: Child[];
  addChild: (child: Child) => void;
  removeChild: (uuid: Child["uuid"]) => void;
};

const LayerContext = React.createContext<LayerContextType>({
  currentChildren: [],
  addChild() {},
  removeChild() {},
});

type BorderArray = [
  topLeft?: number,
  topRight?: number,
  bottomRight?: number,
  bottomLeft?: number
];

type Props = GroupProps & {
  zIndex?: number;
  visible?: boolean;
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
  childIndex?: number;
};

const DEFAULT_BACKGROUND_POSITION: Props["backgroundPosition"] = [0, 0];

export default function Layer({
  zIndex = 0,
  resolution = 512,
  visible = true,
  width = 1,
  height = 1,
  opacity = 1,
  backgroundColor = "transparent",
  backgroundImage,
  backgroundSize,
  backgroundPosition = DEFAULT_BACKGROUND_POSITION,
  borderRadius = 0,
  borderWidth = 0,
  borderColor = "transparent",
  childIndex,
  children,
  ...props
}: Props) {
  const gl = useThree((state) => state.gl);

  const materialRef = React.useRef<THREE.MeshBasicMaterial>(null);

  const layerContext = React.useContext(LayerContext);

  const uuid = React.useMemo(() => {
    return THREE.MathUtils.generateUUID();
  }, []);

  React.useEffect(() => {
    if (childIndex === undefined) return;
    layerContext.addChild({ width, height, index: childIndex, uuid });
    return () => {
      layerContext.removeChild(uuid);
    };
  }, [width, height, childIndex, uuid]);

  // Create 2d canvas context
  const ctx = React.useMemo<CanvasRenderingContext2D>(() => {
    const canvas = document.createElement("canvas");
    return canvas.getContext("2d");
  }, []);

  // Create canvas texture with the newly created canvas;
  // this will be used as the texture for the plane
  const canvasTexture = React.useMemo(() => {
    const canvasTexture = new THREE.CanvasTexture(ctx.canvas);
    canvasTexture.anisotropy = gl.capabilities.getMaxAnisotropy();
    return canvasTexture;
  }, [ctx.canvas, gl.capabilities]);

  // Set canvas size
  React.useMemo(() => {
    ctx.canvas.width = Math.max(1, Math.floor(width * resolution));
    ctx.canvas.height = Math.max(1, Math.floor(height * resolution));
  }, [ctx.canvas, width, height, resolution]);

  const images = React.useMemo(() => {
    const backgroundImage = new Image();
    return { backgroundImage };
  }, []);

  // Set source for background image
  React.useMemo(() => {
    images.backgroundImage.src = backgroundImage;
  }, [images.backgroundImage, backgroundImage]);

  useFrame(() => {
    // Useful vars
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const d2r = Math.PI / 180; // degrees to radians
    const res = (w + h) / 2;
    const { mapLinear } = THREE.MathUtils;

    ctx.globalCompositeOperation = "source-over";

    ctx.clearRect(0, 0, w, h);

    // Border radius
    {
      const isArray = Array.isArray(borderRadius);
      const array = borderRadius as BorderArray;
      const number = borderRadius as number;
      let [tl = 0, tr = 0, br = 0, bl = 0] = isArray
        ? array
        : [number, number, number, number];
      tl *= res;
      tr *= res;
      br *= res;
      bl *= res;
      ctx.beginPath();
      ctx.moveTo(tl, 0);
      ctx.lineTo(w - tr, 0);
      ctx.arc(w - tr, tr, tr, d2r * 270, d2r * 360);
      ctx.lineTo(w, h - br);
      ctx.arc(w - br, h - br, br, 0, d2r * 90);
      ctx.lineTo(bl, h);
      ctx.arc(bl, h - bl, bl, d2r * 90, d2r * 180);
      ctx.lineTo(0, tl);
      ctx.arc(tl, tl, tl, d2r * 180, d2r * 270);
      ctx.closePath();
    }

    ctx.globalAlpha = opacity;

    // Background color
    ctx.fillStyle = backgroundColor;
    ctx.lineWidth = borderWidth * res * 2;
    ctx.fill();

    // Background image
    if (backgroundImage !== undefined) {
      const x = backgroundPosition[0];
      const y = backgroundPosition[1];
      const ox = borderWidth * res;
      const oy = borderWidth * res;
      const sx = 0;
      const sy = 0;
      const sw = images.backgroundImage.width;
      const sh = images.backgroundImage.height;
      const ir = sw / sh;
      const cr = w / h;
      let dw = sw;
      let dh = sh;
      switch (backgroundSize) {
        case "stretch":
          dw = w;
          dh = h;
          break;
        case "contain":
          dw = w - ox * 2;
          dh = h - oy * 2;
          if (ir > cr) {
            dh = dw / ir;
          } else {
            dw = dh * ir;
          }
          break;
        case "cover":
          dw = w - ox * 2;
          dh = h - oy * 2;
          if (ir < cr) {
            dh = dw / ir;
          } else {
            dw = dh * ir;
          }
          break;
      }
      const dx = ox + mapLinear(x, 0, 1, 0, w - ox * 2 - dw);
      const dy = oy + mapLinear(y, 0, 1, 0, h - oy * 2 - dh);
      ctx.save();
      ctx.clip();
      ctx.drawImage(images.backgroundImage, sx, sy, sw, sh, dx, dy, dw, dh);
      ctx.restore();
    }

    // Fixes antialiasing issue
    ctx.globalCompositeOperation = "destination-out";
    ctx.stroke();
    ctx.globalCompositeOperation = "source-over";
    ctx.save();
    ctx.clip();

    ctx.strokeStyle = borderColor;
    // Border
    ctx.stroke();
    ctx.restore();

    // Make sure canvas texture gets updated
    canvasTexture.needsUpdate = true;

    const material = materialRef.current;
    if (material !== null) {
      material.needsUpdate = true;
    }
  });

  const [currentChildren, setCurrentChildren] = React.useState<
    LayerContextType["currentChildren"]
  >([]);

  const childGroupRefs = React.useMemo(() => {
    return currentChildren.map(() => React.createRef<THREE.Group>());
  }, [currentChildren]);

  React.useEffect(() => {
    childGroupRefs.forEach((childGroupRef, index) => {
      const child = currentChildren[index];
      childGroupRef.current.position.x = child.width * index;
      childGroupRef.current.position.y = child.height * -index;
    });
  }, [childGroupRefs, currentChildren]);

  const layerProviderValue = React.useMemo<LayerContextType>(() => {
    return {
      currentChildren,
      addChild(child) {
        setCurrentChildren((currentChildren) => {
          const index = currentChildren.findIndex((value) => {
            return value.uuid === child.uuid;
          });
          if (index === -1) {
            return [...currentChildren, child];
          } else {
            return currentChildren.map((value) => {
              if (value.uuid === child.uuid) {
                return { ...value, ...child };
              }
              return value;
            });
          }
        });
      },
      removeChild(uuid) {
        setCurrentChildren((currentChildren) => {
          return currentChildren.filter((value) => value.uuid !== uuid);
        });
      },
    };
  }, [currentChildren, childIndex]);

  return (
    <LayerContext.Provider value={layerProviderValue}>
      <group {...props}>
        <mesh visible={visible} renderOrder={zIndex + (childIndex ?? 0)}>
          <planeBufferGeometry args={[width, height]} />
          <meshBasicMaterial
            ref={materialRef}
            side={THREE.FrontSide}
            opacity={opacity}
            transparent={true}
            depthWrite={false}
            depthTest={false}
            map={canvasTexture}
          />
        </mesh>
        <group renderOrder={zIndex + 1}>
          {React.Children.map(children, (child, childIndex) => {
            if (React.isValidElement(child)) {
              return (
                <group key={childIndex} ref={childGroupRefs[childIndex]}>
                  {React.cloneElement(child, { ...child.props, childIndex })}
                </group>
              );
            }
            return child;
          })}
        </group>
      </group>
    </LayerContext.Provider>
  );
}
