import React from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import canvasTxt from "canvas-txt";
import useRenderOrder from "../hooks/use-render-order";
import layout from "../services/layout";
import { BorderArray, LayerContextType, LayerProps } from "../types";

const LayerContext = React.createContext<LayerContextType>({
  parentUuid: null,
  currentChildren: [],
  addChild() {},
  removeChild() {},
});

const DEFAULT_BACKGROUND_POSITION: LayerProps["backgroundPosition"] = [0, 0];

function Layer(
  {
    zIndex = 0,
    resolution = 2048,
    visible = true,
    autoLayout = true,
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
    flexDirection = "row",
    alignItems = "center",
    justifyContent = "center",
    gap = 0,
    textContent,
    textAlign = "left",
    justifyText = false,
    verticalAlign = "top",
    color = "white",
    fontFamily = "system-ui, sans-serif",
    fontSize = 0.1,
    fontWeight = "normal",
    childIndex,
    children,
    ...props
  }: LayerProps,
  ref: React.ForwardedRef<THREE.Group>
) {
  const renderOrder = useRenderOrder();

  const gl = useThree((state) => state.gl);

  const materialRef = React.useRef<THREE.MeshBasicMaterial>(null);
  const childrenGroupRef = React.useRef<THREE.Group>(null);

  const layerContext = React.useContext(LayerContext);

  const uuid = React.useMemo(() => {
    return THREE.MathUtils.generateUUID();
  }, []);

  React.useEffect(() => {
    if (layerContext.parentUuid === null) return;
    layerContext.addChild({ width, height, index: childIndex, uuid });
    return () => {
      layerContext.removeChild(uuid);
    };
  }, [width, height, childIndex, layerContext.parentUuid]);

  // Create 2d canvas context
  const ctx = React.useMemo<CanvasRenderingContext2D>(() => {
    const canvas = document.createElement("canvas");
    return canvas.getContext("2d");
  }, []);

  // Set canvas size
  React.useMemo(() => {
    ctx.canvas.width = Math.max(1, Math.floor(width * resolution));
    ctx.canvas.height = Math.max(1, Math.floor(height * resolution));
  }, [ctx.canvas, width, height, resolution]);

  // Create canvas texture with the newly created canvas;
  // this will be used as the texture for the plane
  const canvasTexture = React.useMemo(() => {
    const canvasTexture = new THREE.CanvasTexture(ctx.canvas);
    canvasTexture.anisotropy = gl.capabilities.getMaxAnisotropy();
    return canvasTexture;
  }, [ctx.canvas, gl.capabilities, width, height]);

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

    const ox = borderWidth * res;
    const oy = borderWidth * res;

    // Background image
    if (backgroundImage !== undefined) {
      const x = backgroundPosition[0];
      const y = backgroundPosition[1];
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

    // Typography
    if (textContent !== undefined) {
      canvasTxt.font = fontFamily;
      canvasTxt.fontSize = fontSize * Math.min(w, h);
      canvasTxt.align = textAlign;
      canvasTxt.vAlign = verticalAlign;
      canvasTxt.justify = justifyText;
      canvasTxt.fontWeight = fontWeight;
      ctx.textBaseline = "bottom";
      ctx.fillStyle = color;
      canvasTxt.drawText(ctx, textContent, ox, oy, w - ox * 2, h - oy * 2);
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
  });

  const [currentChildren, setCurrentChildren] = React.useState<
    LayerContextType["currentChildren"]
  >([]);

  const childGroupRefs = React.useMemo(() => {
    return currentChildren.map(() => React.createRef<THREE.Group>());
  }, [currentChildren]);

  // Layout calculations
  React.useEffect(() => {
    const size = { width, height };
    size.width -= borderWidth * 2;
    size.height -= borderWidth * 2;
    let refs = [...childGroupRefs];
    if (["column", "row-reverse"].includes(flexDirection)) {
      refs.reverse();
    }
    refs.forEach((ref, index) => {
      const [x, y] = layout({
        currentChildren,
        index,
        flexDirection,
        alignItems,
        justifyContent,
        gap,
        size,
      });
      ref.current.position.x = x;
      ref.current.position.y = y;
    });
  }, [
    childGroupRefs,
    currentChildren,
    width,
    height,
    flexDirection,
    alignItems,
    justifyContent,
    borderWidth,
    gap,
  ]);

  const layerProviderValue = React.useMemo<LayerContextType>(() => {
    return {
      currentChildren,
      parentUuid: uuid,
      addChild(child) {
        setCurrentChildren((currentChildren) => {
          const nextCurrentChildren = [...currentChildren];
          const index = currentChildren.findIndex((value) => {
            return value.uuid === child.uuid;
          });
          if (index === -1) {
            nextCurrentChildren.push({ ...child });
          } else {
            nextCurrentChildren[index] = { ...child };
          }
          return nextCurrentChildren.sort((a, b) => {
            return a.index - b.index;
          });
        });
      },
      removeChild(uuid) {
        setCurrentChildren((currentChildren) => {
          return currentChildren.filter((value) => value.uuid !== uuid);
        });
      },
    };
  }, [currentChildren, uuid]);

  React.useEffect(() => {
    const childrenGroup = childrenGroupRef.current;
    if (childrenGroup === null) return;
    childrenGroup.traverse((object) => {
      if (
        object instanceof THREE.Mesh &&
        object.material instanceof THREE.Material
      ) {
        object.material.transparent = true;
        object.material.opacity = opacity;
        object.material.needsUpdate = true;
      }
    });
  }, [opacity]);

  return (
    <LayerContext.Provider value={layerProviderValue}>
      <group ref={ref} {...props} visible={visible}>
        <mesh renderOrder={renderOrder + zIndex}>
          <planeBufferGeometry args={[width, height]} />
          <meshBasicMaterial
            ref={materialRef}
            side={THREE.FrontSide}
            opacity={opacity}
            transparent={true}
            depthWrite={false}
            map={canvasTexture}
          />
        </mesh>
        <group renderOrder={renderOrder + zIndex + 1} ref={childrenGroupRef}>
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

const ForwardedLayer = React.forwardRef(Layer);
ForwardedLayer.displayName = "layer";
export default ForwardedLayer;