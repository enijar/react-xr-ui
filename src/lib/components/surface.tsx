import React from "react";
import { mergeRefs } from "react-merge-refs";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events";
import useRenderOrder from "@/lib/hooks/use-render-order";
import useRenderKey from "@/lib/hooks/use-render-key";
import surfaces from "@/lib/state/surfaces";
import { SurfaceContext } from "@/lib/context/surface-context";

type Props = {
  children?: React.ReactNode;
  width?: number;
  height?: number;
  backgroundColor?: THREE.ColorRepresentation;
  backgroundImage?: string;
  backgroundSize?: "cover" | "contain";
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  alignItems?: "start" | "center" | "end";
  justifyContent?:
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around";
  gap?: number;
  zIndex?: number;
  position?: [x: number, y: number, z: number];
  rotation?: [x: number, y: number, z: number];
  onClick?: (event: ThreeEvent<MouseEvent>) => void;
  onContextMenu?: (event: ThreeEvent<MouseEvent>) => void;
  onDoubleClick?: (event: ThreeEvent<MouseEvent>) => void;
  onPointerUp?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerDown?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerOver?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerEnter?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerLeave?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerMove?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerMissed?: (event: MouseEvent) => void;
  onPointerCancel?: (event: ThreeEvent<PointerEvent>) => void;
  onWheel?: (event: ThreeEvent<WheelEvent>) => void;
};

function Surface(
  {
    children,
    width = 1,
    height = 1,
    backgroundColor = "black",
    backgroundImage,
    backgroundSize,
    zIndex = 0,
    position,
    rotation,
    flexDirection = "row",
    alignItems = "start",
    justifyContent = "start",
    gap = 0,
    onClick,
    onContextMenu,
    onDoubleClick,
    onPointerUp,
    onPointerDown,
    onPointerOver,
    onPointerOut,
    onPointerEnter,
    onPointerLeave,
    onPointerMove,
    onPointerMissed,
    onPointerCancel,
    onWheel,
  }: Props,
  forwardedRef: React.ForwardedRef<THREE.Group>
) {
  const gl = useThree((state) => state.gl);

  // Set geometry size from `width` and `height` props
  const size = React.useMemo(() => {
    return { width, height };
  }, [width, height]);

  // Set material texture from `backgroundImage` prop
  const [texture, setTexture] = React.useState<THREE.Texture>(undefined);
  React.useMemo(() => {
    if (backgroundImage === undefined) return;
    new THREE.TextureLoader().loadAsync(backgroundImage).then(setTexture);
  }, [backgroundImage]);

  // Set texture `anisotropy` to max available (prevents blurriness)
  // when viewing at an angle
  React.useMemo(() => {
    if (texture === undefined) return;
    texture.anisotropy = gl.capabilities.getMaxAnisotropy();
  }, [texture, gl]);

  const [surfaceRatio, imageRatioX, imageRatioY] = React.useMemo(() => {
    const surfaceRatio = size.width / size.height;
    if (texture === undefined) {
      return [surfaceRatio, surfaceRatio, surfaceRatio];
    }
    const imageRatioX = texture.image.width / texture.image.height;
    const imageRatioY = texture.image.height / texture.image.width;
    return [surfaceRatio, imageRatioX, imageRatioY];
  }, [texture, size]);

  const [clippingPlanes, setClippingPlanes] = React.useState<THREE.Plane[]>(
    () => {
      const plane = new THREE.Plane(new THREE.Vector3(), 1);
      return [plane.clone(), plane.clone(), plane.clone(), plane.clone()];
    }
  );

  const [textureSize, setTextureSize] = React.useState(() => {
    return { ...size };
  });

  const nodes = React.useMemo(() => {
    if (children === undefined) return [];
    if (!Array.isArray(children)) return [children];
    return children;
  }, [children]);

  const vec = React.useMemo(() => {
    return new THREE.Vector2(0, 0);
  }, []);

  const { parentId } = React.useContext(SurfaceContext);

  const getChildPosition = React.useCallback(
    // @todo fix types
    (index: number): Props["position"] => {
      console.log(surfaces);

      const displayName = nodes[index].type.displayName ?? "";
      if (!["ui-surface"].includes(displayName)) return [0, 0, 0];
      // @todo simplify this
      const width = nodes.reduce((width, node) => width + node.props.width, 0);
      const height = nodes.reduce(
        (height, node) => height + node.props.height,
        0
      );

      vec.set(0, 0);

      let contentSize = width;

      type Axis = "width" | "height";

      let axis: Axis = "width";
      let axisInverted: Axis = "height";
      if (flexDirection === "column") {
        axis = "height";
        axisInverted = "width";
        contentSize = height;
      }

      if (
        nodes.length > 0 &&
        !["space-between", "space-around"].includes(justifyContent)
      ) {
        contentSize += gap * (nodes.length - 1);
      }

      /**
       * justifyContent
       */
      if (justifyContent === "start") {
        vec.x = size[axis] * 0.5 + nodes[0].props[axis] * 0.5 - size[axis];
        for (let i = 1; i <= index; i++) {
          vec.x +=
            nodes[i - 1].props[axis] * 0.5 + nodes[i].props[axis] * 0.5 + gap;
        }
      }
      if (justifyContent === "center") {
        vec.x = nodes[0].props[axis] * 0.5 - contentSize * 0.5;
        for (let i = 1; i <= index; i++) {
          vec.x +=
            nodes[i - 1].props[axis] * 0.5 + nodes[i].props[axis] * 0.5 + gap;
        }
      }
      if (justifyContent === "end") {
        vec.x = size[axis] * 0.5 + nodes[0].props[axis] * 0.5 - contentSize;
        for (let i = 1; i <= index; i++) {
          vec.x +=
            nodes[i - 1].props[axis] * 0.5 + nodes[i].props[axis] * 0.5 + gap;
        }
      }
      if (justifyContent === "space-between") {
        if (contentSize >= size[axis]) {
          vec.x = size[axis] * 0.5 + nodes[0].props[axis] * 0.5 - size[axis];
          for (let i = 1; i <= index; i++) {
            vec.x +=
              nodes[i - 1].props[axis] * 0.5 + nodes[i].props[axis] * 0.5;
          }
        } else {
          let spacing = Math.max(0, size[axis] - contentSize);
          if (nodes.length === 0) {
            spacing = 0;
          } else if (spacing > 0) {
            spacing /= nodes.length - 1;
          }
          vec.x = size[axis] * 0.5 + nodes[0].props[axis] * 0.5 - size[axis];
          for (let i = 1; i <= index; i++) {
            vec.x +=
              nodes[i - 1].props[axis] * 0.5 +
              nodes[i].props[axis] * 0.5 +
              spacing;
          }
        }
      }
      if (justifyContent === "space-around") {
        if (contentSize >= size[axis]) {
          vec.x = size[axis] * 0.5 + nodes[0].props[axis] * 0.5 - size[axis];
          for (let i = 1; i <= index; i++) {
            vec.x +=
              nodes[i - 1].props[axis] * 0.5 + nodes[i].props[axis] * 0.5;
          }
        } else {
          let spacing = Math.max(0, size[axis] - contentSize);
          if (nodes.length === 0) {
            spacing = 0;
          } else if (spacing > 0) {
            spacing /= nodes.length + 1;
          }
          vec.x = size[axis] * 0.5 + nodes[0].props[axis] * 0.5 - size[axis];
          vec.x += spacing;
          for (let i = 1; i <= index; i++) {
            vec.x +=
              nodes[i - 1].props[axis] * 0.5 +
              nodes[i].props[axis] * 0.5 +
              spacing;
          }
        }
      }

      /**
       * alignItems
       */
      if (alignItems === "start") {
        if (flexDirection === "row") {
          vec.y =
            size[axisInverted] * 0.5 - nodes[index].props[axisInverted] * 0.5;
        }
        if (flexDirection === "column") {
          vec.y =
            size[axisInverted] * -0.5 + nodes[index].props[axisInverted] * 0.5;
        }
      }
      if (alignItems === "center") {
        // No calculation needed
      }
      if (alignItems === "end") {
        if (flexDirection === "row") {
          vec.y =
            size[axisInverted] * -0.5 + nodes[index].props[axisInverted] * 0.5;
        }
        if (flexDirection === "column") {
          vec.y =
            size[axisInverted] * 0.5 - nodes[index].props[axisInverted] * 0.5;
        }
      }

      if (flexDirection === "column") {
        return [vec.y, vec.x, 0];
      }

      return [vec.x, vec.y, 0];
    },
    [nodes, size, flexDirection, alignItems, justifyContent, gap, vec, parentId]
  );

  const [childPositions, setChildPositions] = React.useState<
    Props["position"][]
  >(() => {
    return nodes.map((node, index) => getChildPosition(index));
  });

  React.useEffect(() => {
    setChildPositions(nodes.map((node, index) => getChildPosition(index)));
  }, [nodes, getChildPosition]);

  React.useEffect(() => {
    if (texture === undefined) return;

    const newSize = { ...size };

    if (backgroundSize === "contain") {
      if (imageRatioX >= surfaceRatio) {
        newSize.width = size.width;
        newSize.height = newSize.width * imageRatioY;
      } else {
        newSize.height = size.height;
        newSize.width = newSize.height * imageRatioX;
      }
    }

    if (backgroundSize === "cover") {
      if (imageRatioX >= surfaceRatio) {
        newSize.height = size.height;
        newSize.width = newSize.height * imageRatioX;
      } else {
        newSize.width = size.width;
        newSize.height = newSize.width * imageRatioY;
      }
    }

    setTextureSize(newSize);
    setClippingPlanes((planes) => {
      planes[0].set(new THREE.Vector3(0, -1, 0), size.height * 0.5);
      planes[1].set(new THREE.Vector3(1, 0, 0), size.width * 0.5);
      planes[2].set(new THREE.Vector3(0, 1, 0), size.height * 0.5);
      planes[3].set(new THREE.Vector3(-1, 0, 0), size.width * 0.5);
      return [...planes];
    });
  }, [
    rotation,
    position,
    childPositions,
    texture,
    size,
    backgroundSize,
    imageRatioX,
    imageRatioY,
    surfaceRatio,
  ]);

  const groupRef = React.useRef<THREE.Group>(null);

  React.useEffect(() => {
    const group = groupRef.current;
    if (group === null) return;
    group.updateMatrixWorld(true);
    clippingPlanes.forEach((plane) => {
      plane.applyMatrix4(group.matrixWorld);
    });
  }, [rotation, position, childPositions, clippingPlanes]);

  const renderOrder = useRenderOrder();
  const key = useRenderKey([
    childPositions,
    texture,
    rotation,
    position,
    children,
    textureSize,
    clippingPlanes,
  ]);

  const id = React.useId();

  React.useEffect(() => {
    const group = groupRef.current;
    if (group === null) return;
    if (parentId === undefined) return;
    if (!surfaces.hasOwnProperty(parentId)) {
      surfaces[parentId] = [];
    }
    surfaces[parentId].push({ ...size, id });
  }, [size, parentId, id]);

  return (
    <group
      ref={mergeRefs([groupRef, forwardedRef])}
      key={key}
      rotation={rotation}
      position={position}
      onClick={onClick}
      onContextMenu={onContextMenu}
      onDoubleClick={onDoubleClick}
      onPointerUp={onPointerUp}
      onPointerDown={onPointerDown}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
      onPointerMissed={onPointerMissed}
      onPointerCancel={onPointerCancel}
      onWheel={onWheel}
    >
      <mesh renderOrder={renderOrder + zIndex}>
        <planeBufferGeometry args={[size.width, size.height]} />
        <meshBasicMaterial
          color={backgroundColor}
          transparent={true}
          depthWrite={false}
        />
      </mesh>
      <mesh renderOrder={renderOrder + zIndex} visible={texture !== undefined}>
        <planeBufferGeometry args={[textureSize.width, textureSize.height]} />
        <meshBasicMaterial
          map={texture}
          transparent={true}
          depthWrite={false}
          clippingPlanes={clippingPlanes}
        />
      </mesh>
      <SurfaceContext.Provider value={{ parentId: id }}>
        {React.Children.map(children, (child: any, index) => {
          return (
            <group key={index} position={childPositions[index]}>
              {child}
            </group>
          );
        })}
      </SurfaceContext.Provider>
    </group>
  );
}

const Component = React.forwardRef(Surface);

Component.displayName = "ui-surface";

export default Component;
