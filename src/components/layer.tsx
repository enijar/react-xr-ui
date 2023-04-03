import React from "react";
import * as THREE from "three";
import canvasTxt from "canvas-txt";
import { useFrame } from "@react-three/fiber";
import layout from "../services/layout";
import {
  Attrs,
  LayerContextType,
  LayerProps,
  LayerRef,
  ValueArray,
} from "../types";
import { XrUiContext } from "./xr-ui";

const LayerContext = React.createContext<LayerContextType>({
  parentUuid: null,
  parentSize: { width: 1, height: 1 },
  currentChildren: [],
  renderOrder: 0,
  addChild() {},
  removeChild() {},
});

const DEFAULT_BACKGROUND_POSITION: LayerProps["backgroundPosition"] = [0, 0];

const CACHED_IMAGES = new Map<string, HTMLImageElement>();

function Layer(
  {
    optimizedRendering,
    zIndex = 0,
    resolution,
    visible = true,
    autoLayout = true,
    depthTest = false,
    depthWrite = false,
    width,
    height,
    aspectRatio,
    opacity = 1,
    backgroundColor = "transparent",
    backgroundImage,
    backgroundSize,
    backgroundPosition = DEFAULT_BACKGROUND_POSITION,
    alphaTest = 0,
    padding = 0,
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
    fontFamily,
    fontSize = 0.1,
    fontWeight = "normal",
    lineHeight = null,
    childIndex,
    children,
    onPointerMove,
    onPointerOver,
    onPointerOut,
    onPointerDown,
    onPointerUp,
    imageRendering = "crisp-edges",
    imageSmoothingEnabled = true,
    textRendering = "auto",
    dpr,
    ...props
  }: LayerProps,
  ref: React.ForwardedRef<LayerRef>
) {
  const [attrs, setAttrs] = React.useState<Attrs>(() => {
    return {
      opacity,
    };
  });

  React.useEffect(() => {
    setAttrs((attrs) => {
      return { ...attrs, opacity };
    });
  }, [opacity]);

  const xrUiContext = React.useContext(XrUiContext);

  const res = React.useMemo(() => {
    return resolution ?? xrUiContext.layerResolution;
  }, [resolution, xrUiContext.layerResolution]);

  const font = React.useMemo(() => {
    return fontFamily ?? xrUiContext.fontFamily;
  }, [fontFamily, xrUiContext.fontFamily]);

  const optimized = React.useMemo(() => {
    return optimizedRendering ?? xrUiContext.optimizedRendering;
  }, [optimizedRendering, xrUiContext.optimizedRendering]);

  const groupRef = React.useRef<THREE.Group>(null);
  const meshRef = React.useRef<THREE.Mesh>(null);
  const materialRef = React.useRef<THREE.MeshBasicMaterial>(null);
  const childrenGroupRef = React.useRef<THREE.Group>(null);

  React.useEffect(() => {
    const material = materialRef.current;
    if (material === null) return;
    material.blending = THREE.CustomBlending;
  }, []);

  React.useImperativeHandle(ref, (): LayerRef => {
    return {
      group: groupRef.current,
      mesh: meshRef.current,
      material: materialRef.current,
      setAttrs: setAttrs,
    };
  });

  const layerContext = React.useContext(LayerContext);

  const size = React.useMemo<{ width: number; height: number }>(() => {
    const size: { width: number; height: number } = { width: 1, height: 1 };
    if (typeof width === "string") {
      const percent = parseFloat(width);
      if (layerContext.parentUuid === null) {
        size.width = percent / 100;
      } else if (isNaN(percent)) {
        size.width = 1;
      } else {
        size.width = layerContext.parentSize.width * (percent / 100);
      }
    } else {
      size.width = width ?? 1;
    }
    if (typeof height === "string") {
      const percent = parseFloat(height);
      if (layerContext.parentUuid === null) {
        size.height = percent / 100;
      } else if (isNaN(percent)) {
        size.height = 1;
      } else {
        size.height = layerContext.parentSize.height * (percent / 100);
      }
    } else {
      size.height = height ?? 1;
    }
    if (aspectRatio !== undefined) {
      if (width === undefined) {
        size.width = size.height * aspectRatio;
      }
      if (height === undefined) {
        size.height = size.width * aspectRatio;
      }
    }
    return size;
  }, [
    width,
    height,
    layerContext.parentUuid,
    layerContext.parentSize,
    aspectRatio,
  ]);

  const uuid = React.useMemo(() => {
    return THREE.MathUtils.generateUUID();
  }, []);

  React.useEffect(() => {
    if (layerContext.parentUuid === null) return;
    layerContext.addChild({
      width: size.width,
      height: size.height,
      index: childIndex,
      autoLayout,
      uuid,
    });
    return () => {
      layerContext.removeChild(uuid);
    };
  }, [size, childIndex, autoLayout, layerContext.parentUuid]);

  const pointerRefs = React.useRef({
    onPointerMove,
    onPointerOver,
    onPointerOut,
    onPointerDown,
    onPointerUp,
  });

  React.useMemo(() => {
    pointerRefs.current.onPointerMove = onPointerMove;
    pointerRefs.current.onPointerOver = onPointerOver;
    pointerRefs.current.onPointerOut = onPointerOut;
    pointerRefs.current.onPointerDown = onPointerDown;
    pointerRefs.current.onPointerUp = onPointerUp;
  }, [onPointerMove, onPointerOver, onPointerOut, onPointerDown, onPointerUp]);

  // Create 2d canvas context
  const ctx = React.useMemo<CanvasRenderingContext2D>(() => {
    const canvas = document.createElement("canvas");
    return canvas.getContext("2d");
  }, []);

  React.useEffect(() => {
    ctx.imageSmoothingEnabled = imageSmoothingEnabled;
    ctx.canvas.style.imageRendering = imageRendering;
  }, [ctx, imageRendering, imageSmoothingEnabled]);

  React.useEffect(() => {
    // @ts-ignore
    ctx.textRendering = textRendering;
    ctx.canvas.style.textRendering = textRendering;
  }, [ctx, textRendering]);

  React.useMemo(() => {
    const s = dpr ?? window.devicePixelRatio ?? 1;
    ctx.scale(s, s);
  }, [ctx, dpr]);

  // Set canvas size
  React.useMemo(() => {
    ctx.canvas.width = Math.max(1, Math.floor(size.width * res));
    ctx.canvas.height = Math.max(1, Math.floor(size.height * res));
  }, [ctx.canvas, size, res]);

  // Create canvas texture with the newly created canvas;
  // this will be used as the texture for the plane
  const canvasTexture = React.useMemo(() => {
    const canvasTexture = new THREE.CanvasTexture(ctx.canvas);
    canvasTexture.anisotropy = 16;
    canvasTexture.premultiplyAlpha = true;
    return canvasTexture;
  }, [ctx.canvas, size]);

  const images = React.useMemo(() => {
    const backgroundImage = new Image();
    return { backgroundImage };
  }, []);

  // Set source for background image
  React.useMemo(() => {
    if (!backgroundImage) return;
    if (!CACHED_IMAGES.has(backgroundImage)) {
      const image = new Image();
      image.src = backgroundImage;
      CACHED_IMAGES.set(backgroundImage, image);
    }
    images.backgroundImage = CACHED_IMAGES.get(backgroundImage);
  }, [images.backgroundImage, backgroundImage]);

  // Only render once if in optimizedRendering mode, else render @ 60FPS
  const shouldRenderRef = React.useRef(true);
  React.useEffect(() => {
    shouldRenderRef.current = true;
    const frames: number[] = [];
    frames.push(
      requestAnimationFrame(() => {
        frames.push(
          requestAnimationFrame(() => {
            shouldRenderRef.current = !optimized;
          })
        );
      })
    );
    return () => {
      frames.forEach((frame) => {
        cancelAnimationFrame(frame);
      });
    };
  }, [
    optimized,
    ctx.canvas,
    size,
    res,
    borderRadius,
    borderColor,
    attrs,
    images,
    backgroundColor,
    backgroundPosition,
    backgroundSize,
    font,
    fontSize,
    lineHeight,
    textAlign,
    verticalAlign,
    justifyText,
    fontWeight,
    color,
    textContent,
  ]);

  useFrame(() => {
    if (shouldRenderRef.current) {
      // Useful vars
      const w = ctx.canvas.width;
      const h = ctx.canvas.height;
      const d2r = Math.PI / 180; // degrees to radians
      const res = Math.min(w, h);
      const { mapLinear } = THREE.MathUtils;

      ctx.globalCompositeOperation = "source-over";

      ctx.clearRect(0, 0, w, h);

      // Border radius
      {
        const isArray = Array.isArray(borderRadius);
        const array = borderRadius as ValueArray;
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

      ctx.globalAlpha = attrs.opacity;

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
        const sw = Math.max(1, images.backgroundImage.width);
        const sh = Math.max(1, images.backgroundImage.height);
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
            if (ir >= cr) {
              dh = dw / ir;
            } else {
              dw = dh * ir;
            }
            break;
          case "cover":
            dw = w - ox * 2;
            dh = h - oy * 2;
            if (ir <= cr) {
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
        canvasTxt.font = font;
        canvasTxt.fontSize = fontSize * Math.min(w, h);
        canvasTxt.lineHeight = lineHeight * canvasTxt.fontSize;
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
    }

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
    const newSize = { ...size };
    const res = Math.min(newSize.width, newSize.height);
    const paddingX = Array.isArray(padding)
      ? (padding[1] ?? 0) + (padding[3] ?? 0)
      : padding;
    const paddingY = Array.isArray(padding)
      ? (padding[0] ?? 0) + (padding[2] ?? 0)
      : padding;
    newSize.width -= res * borderWidth * 2;
    newSize.height -= res * borderWidth * 2;
    newSize.width -= res * paddingX * 2;
    newSize.height -= res * paddingY * 2;
    childGroupRefs.forEach((childGroupRef, index) => {
      const childGroup = childGroupRef.current;
      if (childGroup === null) return;
      let [x, y] = layout({
        currentChildren,
        index,
        flexDirection,
        alignItems,
        justifyContent,
        gap,
        size: newSize,
      });
      if (!currentChildren[index].autoLayout) {
        x = 0;
        y = 0;
      }
      childGroup.position.x = x;
      childGroup.position.y = y;
    });
  }, [
    childGroupRefs,
    currentChildren,
    size,
    flexDirection,
    alignItems,
    justifyContent,
    borderWidth,
    padding,
    gap,
  ]);

  const renderOrder = React.useMemo(() => {
    if (layerContext.parentUuid === null) {
      return zIndex;
    }
    return layerContext.renderOrder + zIndex + 1;
  }, [layerContext.parentUuid, layerContext.renderOrder, zIndex]);

  const alpha = React.useMemo(() => {
    return xrUiContext.alphaTest ?? alphaTest;
  }, [xrUiContext.alphaTest, alphaTest]);

  const layerProviderValue = React.useMemo<LayerContextType>(() => {
    return {
      currentChildren,
      parentSize: size,
      parentUuid: uuid,
      renderOrder,
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
  }, [currentChildren, uuid, size, renderOrder]);

  React.useEffect(() => {
    const childrenGroup = childrenGroupRef.current;
    if (childrenGroup === null) return;
    childrenGroup.traverse((object) => {
      if (
        object instanceof THREE.Mesh &&
        object.material instanceof THREE.Material
      ) {
        object.material.transparent = true;
        object.material.opacity = attrs.opacity;
        object.material.needsUpdate = true;
      }
    });
  }, [attrs.opacity]);

  React.useEffect(() => {
    return () => {
      ctx.canvas.width = 0;
      ctx.canvas.height = 0;
    };
  }, [ctx]);

  return (
    <LayerContext.Provider value={layerProviderValue}>
      <group
        ref={groupRef}
        {...props}
        visible={visible}
        name="react-xr-ui-layer"
      >
        <mesh ref={meshRef} renderOrder={renderOrder + zIndex}>
          <planeGeometry args={[size.width, size.height]} />
          <meshBasicMaterial
            ref={materialRef}
            side={THREE.FrontSide}
            opacity={attrs.opacity}
            transparent={true}
            depthTest={depthTest}
            depthWrite={depthWrite}
            alphaTest={alpha}
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

export default React.forwardRef(Layer);
