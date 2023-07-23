import React from "react";
import * as THREE from "three";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { useThree } from "@react-three/fiber";
import { Mask, Text, useMask } from "@react-three/drei";
import layout from "../services/layout";
import type { LayerContextType, LayerProps, LayerRef } from "../types";
import { XrUiContext } from "./xr-ui";
import Scroller from "./scroller";
import usePointerEvents from "../hooks/use-pointer-events";

const LayerContext = React.createContext<LayerContextType>({
  parentUuid: null,
  parentSize: { width: 1, height: 1 },
  currentChildren: [],
  renderOrder: 0,
  addChild() {},
  removeChild() {},
});

let lastMaskId = 0;

const DEFAULT_BACKGROUND_POSITION: LayerProps["backgroundPosition"] = [0, 0];

const CACHED_TEXTURES = new Map<string, THREE.Texture>();

const textureLoader = new THREE.TextureLoader();

function Layer(
  {
    zIndex = 0,
    visible = true,
    autoLayout = true,
    depthTest,
    depthWrite = false,
    width,
    height,
    aspectRatio,
    opacity = 1,
    backgroundColor = "transparent",
    backgroundImage,
    backgroundSize,
    backgroundPosition = DEFAULT_BACKGROUND_POSITION,
    padding = 0,
    borderRadius = 0,
    borderWidth = 0,
    borderColor = "transparent",
    flexDirection = "row",
    alignItems = "center",
    justifyContent = "center",
    gap = 0,
    overflow = "visible",
    textContent,
    overflowWrap = "normal",
    textAlign = "left",
    justifyText = false,
    verticalAlign = "top",
    color = "#ffffff",
    fontFamily,
    fontSize = "16px",
    fontWeight = "normal",
    lineHeight,
    childIndex,
    children,
    onPointerMove,
    onPointerOver,
    onPointerOut,
    onPointerDown,
    onPointerUp,
    detail = 32,
    onLayout,
    onMove,
    onOver,
    onOut,
    onDown,
    onUp,
    ...props
  }: LayerProps,
  ref: React.ForwardedRef<LayerRef>,
) {
  const layerContext = React.useContext(LayerContext);

  const xrUiContext = React.useContext(XrUiContext);

  const font = React.useMemo(() => {
    return fontFamily ?? xrUiContext.fontFamily;
  }, [fontFamily, xrUiContext.fontFamily]);

  const groupRef = React.useRef<THREE.Group>(null);
  const maskRef = React.useRef<THREE.Mesh>(null);
  const backgroundColorMaterialRef = React.useRef<THREE.MeshBasicMaterial>(null);
  const backgroundImageMaterialRef = React.useRef<THREE.MeshBasicMaterial>(null);
  const childrenGroupRef = React.useRef<THREE.Group>(null);

  React.useImperativeHandle(ref, (): LayerRef => {
    return {
      group: groupRef.current,
    };
  });

  usePointerEvents(maskRef.current, onMove, onOver, onOut, onDown, onUp);

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
  }, [width, height, layerContext.parentUuid, layerContext.parentSize, aspectRatio]);

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

  const [currentChildren, setCurrentChildren] = React.useState<LayerContextType["currentChildren"]>([]);

  const childs = React.useMemo(() => {
    if (Array.isArray(children)) {
      return children.filter((child) => React.isValidElement(child));
    }
    return React.isValidElement(children) ? children : [];
  }, [children]);

  const childGroupRefs = React.useMemo(() => {
    return currentChildren.map(() => React.createRef<THREE.Group>());
  }, [currentChildren]);

  const onLayoutRef = React.useRef(onLayout);
  React.useMemo(() => {
    onLayoutRef.current = onLayout;
  }, [onLayout]);

  // Layout calculations
  React.useEffect(() => {
    const newSize = { ...size };
    const res = Math.min(newSize.width, newSize.height);
    const paddingX = Array.isArray(padding) ? (padding[1] ?? 0) + (padding[3] ?? 0) : padding;
    const paddingY = Array.isArray(padding) ? (padding[0] ?? 0) + (padding[2] ?? 0) : padding;
    newSize.width -= res * borderWidth;
    newSize.height -= res * borderWidth;
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
    if (onLayoutRef.current) {
      onLayoutRef.current();
    }
  }, [childGroupRefs, currentChildren, size, flexDirection, alignItems, justifyContent, borderWidth, padding, gap]);

  const renderOrder = React.useMemo(() => {
    if (layerContext.parentUuid === null) {
      return zIndex;
    }
    return layerContext.renderOrder + zIndex + 1;
  }, [layerContext.parentUuid, layerContext.renderOrder, zIndex]);

  const maskId = React.useMemo(() => {
    return ++lastMaskId;
  }, []);

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

  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera;

  const realFontSize = React.useMemo(() => {
    if (typeof fontSize === "string") {
      let px = parseFloat(fontSize);
      if (isNaN(px)) {
        px = 16;
      }
      const fovInRadians = (camera.fov * Math.PI) / 180;
      const heightAtDistance = 2 * Math.tan(fovInRadians / 2) * 5;
      return (px / window.innerHeight) * heightAtDistance;
    } else {
      return fontSize * Math.min(size.width, size.height);
    }
  }, [fontSize, size, camera]);

  const [backgroundImageSize, setBackgroundImageSize] = React.useState(() => {
    return { ...size };
  });

  React.useEffect(() => {
    const material = backgroundImageMaterialRef.current;
    if (material === null) return;
    if (backgroundImage === undefined) {
      material.map = undefined;
      material.needsUpdate = true;
      return;
    }

    function resizeBackground(texture: THREE.Texture) {
      const imageAspectRatioX = texture.image.width / texture.image.height;
      const imageAspectRatioY = texture.image.height / texture.image.width;
      let width = size.width;
      let height = size.height;
      if (backgroundSize === "contain") {
        if (imageAspectRatioX >= imageAspectRatioY) {
          width = size.width;
          height = width * imageAspectRatioY;
        } else {
          height = size.height;
          width = height * imageAspectRatioX;
        }
      }
      if (backgroundSize === "cover") {
        if (imageAspectRatioX >= imageAspectRatioY) {
          height = size.height;
          width = height * imageAspectRatioX;
        } else {
          width = size.width;
          height = width * imageAspectRatioY;
        }
      }
      setBackgroundImageSize({ width, height });
      material.map = texture;
      material.needsUpdate = true;
    }

    let texture = CACHED_TEXTURES.get(backgroundImage);
    if (texture === undefined) {
      textureLoader
        .loadAsync(backgroundImage)
        .then((texture) => {
          CACHED_TEXTURES.set(backgroundImage, texture);
          resizeBackground(texture);
        })
        .catch(console.error);
      CACHED_TEXTURES.set(backgroundImage, texture);
    } else {
      resizeBackground(texture);
    }
  }, [backgroundImage, backgroundSize, size]);

  const overflowMask = useMask(maskId);

  const textMaterial = React.useMemo(() => {
    return new THREE.MeshBasicMaterial({});
  }, []);

  React.useEffect(() => {
    textMaterial.opacity = color === "transparent" ? 0 : 1;
    textMaterial.depthTest = depthTest ?? xrUiContext.depthTest;
    textMaterial.depthWrite = depthWrite;
    textMaterial.transparent = true;
    textMaterial.stencilFail = overflowMask.stencilFail;
    textMaterial.stencilFunc = overflowMask.stencilFunc;
    textMaterial.stencilRef = overflowMask.stencilRef;
    textMaterial.stencilWrite = overflowMask.stencilWrite;
    textMaterial.stencilZFail = overflowMask.stencilZFail;
    textMaterial.stencilZPass = overflowMask.stencilZPass;
    textMaterial.needsUpdate = true;
  }, [textMaterial, color, overflowMask, depthTest, depthWrite, xrUiContext.depthTest]);

  const [borderShape, backgroundShape] = React.useMemo(() => {
    const width = size.width;
    const height = size.height;
    const br = borderRadius;
    const r = Math.min(width, height) / 2;
    const topLeft = THREE.MathUtils.clamp(typeof br === "number" ? br * r : br[0] * r, 0, r);
    const topRight = THREE.MathUtils.clamp(typeof br === "number" ? br * r : br[1] * r, 0, r);
    const bottomRight = THREE.MathUtils.clamp(typeof br === "number" ? br * r : br[2] * r, 0, r);
    const bottomLeft = THREE.MathUtils.clamp(typeof br === "number" ? br * r : br[3] * r, 0, r);

    function createShape(scale = 1, thickness = 0) {
      const w = width * scale;
      const h = height * scale;
      const x = w / -2;
      const y = h / -2;

      const topLeftRadius = topLeft - (topLeft < borderWidth ? 0 : thickness * scale);
      const topRightRadius = topRight - (topRight < borderWidth ? 0 : thickness * scale);
      const bottomRightRadius = bottomRight - (bottomRight < borderWidth ? 0 : thickness * scale);
      const bottomLeftRadius = bottomLeft - (bottomLeft < borderWidth ? 0 : thickness * scale);

      const shape = new THREE.Shape();
      shape.moveTo(x + topLeftRadius, y);
      shape.lineTo(x + w - topRightRadius, y);
      shape.absarc(x + w - topRightRadius, y + topRightRadius, topRightRadius, Math.PI * 1.5, Math.PI * 2, false);
      shape.lineTo(x + w, y + h - bottomRight);
      shape.absarc(x + w - bottomRightRadius, y + h - bottomRightRadius, bottomRightRadius, 0, Math.PI * 0.5, false);
      shape.lineTo(x + bottomLeftRadius, y + h);
      shape.absarc(x + bottomLeftRadius, y + h - bottomLeftRadius, bottomLeftRadius, Math.PI * 0.5, Math.PI, false);
      shape.lineTo(x, y + topLeftRadius);
      shape.absarc(x + topLeftRadius, y + topLeftRadius, topLeftRadius, Math.PI, Math.PI * 1.5, false);
      shape.closePath();
      return shape;
    }

    const borderShape = createShape(1);
    const backgroundShape = createShape((width - borderWidth) / width, borderWidth / 2);
    if (borderWidth > 0) {
      borderShape.holes.push(backgroundShape);
    }

    return [borderShape, backgroundShape];
  }, [size, borderRadius, detail, borderWidth]);

  return (
    <LayerContext.Provider value={layerProviderValue}>
      <group ref={groupRef} {...props} visible={visible} name="react-xr-ui-layer-group">
        <Mask ref={maskRef} id={maskId} renderOrder={renderOrder + zIndex} name="react-xr-ui-layer-mesh">
          <shapeGeometry args={[backgroundShape, detail]} />
        </Mask>
        {/* backgroundColor */}
        {backgroundColor !== "transparent" && (
          <mesh renderOrder={renderOrder + zIndex}>
            <shapeGeometry args={[backgroundShape, detail]} />
            <meshBasicMaterial
              ref={backgroundColorMaterialRef}
              side={THREE.FrontSide}
              color={backgroundColor === "transparent" ? undefined : backgroundColor}
              transparent={true}
              depthTest={depthTest ?? xrUiContext.depthTest}
              depthWrite={depthWrite}
            />
          </mesh>
        )}
        {/* backgroundImage */}
        {backgroundImage !== undefined && (
          <mesh
            renderOrder={renderOrder + zIndex}
            position-x={THREE.MathUtils.mapLinear(
              backgroundPosition[0],
              0,
              1,
              backgroundImageSize.width - size.width + backgroundImageSize.width / 2,
              size.width - backgroundImageSize.width - backgroundImageSize.width / 2,
            )}
            position-y={THREE.MathUtils.mapLinear(
              backgroundPosition[1],
              0,
              1,
              backgroundImageSize.height / -2 + size.height / 2,
              backgroundImageSize.height / 2 - size.height / 2,
            )}
          >
            <planeGeometry args={[backgroundImageSize.width, backgroundImageSize.height]} />
            <meshBasicMaterial
              ref={backgroundImageMaterialRef}
              side={THREE.FrontSide}
              transparent={true}
              depthTest={depthTest ?? xrUiContext.depthTest}
              depthWrite={depthWrite}
              stencilFail={overflowMask.stencilFail}
              stencilFunc={overflowMask.stencilFunc}
              stencilRef={overflowMask.stencilRef}
              stencilWrite={overflowMask.stencilWrite}
              stencilZFail={overflowMask.stencilZFail}
              stencilZPass={overflowMask.stencilZPass}
              blending={THREE.CustomBlending}
            />
          </mesh>
        )}
        {/* border */}
        {borderWidth > 0 && (
          <mesh renderOrder={renderOrder + zIndex}>
            <shapeGeometry args={[borderShape, detail]} />
            <meshBasicMaterial
              ref={backgroundColorMaterialRef}
              side={THREE.FrontSide}
              color={borderColor === "transparent" ? undefined : borderColor}
              transparent={true}
              depthTest={depthTest ?? xrUiContext.depthTest}
              depthWrite={depthWrite}
            />
          </mesh>
        )}
        {textContent !== undefined && (
          <Text
            maxWidth={size.width - borderWidth}
            overflowWrap={overflowWrap}
            name="react-xr-ui-layer-text"
            renderOrder={renderOrder + zIndex}
            textAlign={textAlign}
            // anchorX={size.width / 2 - borderWidth / 2}
            anchorY={verticalAlign}
            lineHeight={lineHeight}
            font={font}
            fontSize={realFontSize}
            color={color === "transparent" ? undefined : color}
            material={textMaterial}
          >
            {textContent}
          </Text>
        )}
        <Scroller maskId={maskId} overflow={overflow}>
          <group renderOrder={renderOrder + zIndex + 1} ref={childrenGroupRef}>
            {React.Children.map(childs, (child, childIndex) => {
              return (
                <group key={childIndex} ref={childGroupRefs[childIndex]}>
                  {React.cloneElement(child, { ...child.props, childIndex })}
                </group>
              );
            })}
          </group>
        </Scroller>
      </group>
    </LayerContext.Provider>
  );
}

export default React.forwardRef(Layer);
