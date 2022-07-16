import React from "react";
import { mergeRefs } from "react-merge-refs";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import useRenderOrder from "@/lib/hooks/use-render-order";
import useRenderKey from "@/lib/hooks/use-render-key";

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
    | "space-evenly"
    | "space-around";
  gap?: number;
  zIndex?: number;
  position?: [x: number, y: number, z: number];
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
    flexDirection = "row",
    alignItems = "start",
    justifyContent = "start",
    gap = 0,
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
    position,
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
  }, [position, clippingPlanes]);

  const renderOrder = useRenderOrder();
  const key = useRenderKey([
    texture,
    position,
    children,
    textureSize,
    clippingPlanes,
  ]);

  const nodes = React.useMemo(() => {
    if (children === undefined) return [];
    if (!Array.isArray(children)) return [children];
    return children;
  }, [children]);

  const getChildPosition = React.useCallback(
    // @todo fix types
    (child: any, index: number): Props["position"] => {
      // @todo simplify this
      const width = nodes.reduce((width, node) => width + node.props.width, 0);
      const height = nodes.reduce(
        (height, node) => height + node.props.height,
        0
      );

      let x = 0;
      let y = 0;

      /**
       * row -> justifyContent
       */
      if (flexDirection === "row" && justifyContent === "start") {
        x = size.width * -0.5;
        x += nodes.reduce((width, node, currentIndex) => {
          if (currentIndex === 0) return node.props.width * 0.5;
          if (currentIndex > index) return width;
          return width + node.props.width;
        }, 0);
      }
      if (flexDirection === "row" && justifyContent === "center") {
        x = width * -0.5;
        x += nodes.reduce((width, node, currentIndex) => {
          if (currentIndex === 0) return node.props.width * 0.5;
          if (currentIndex > index) return width;
          return width + node.props.width;
        }, 0);
      }
      if (flexDirection === "row" && justifyContent === "end") {
        x = size.width * 0.5 - width;
        x += nodes.reduce((width, node, currentIndex) => {
          if (currentIndex === 0) return node.props.width * 0.5;
          if (currentIndex > index) return width;
          return width + node.props.width;
        }, 0);
      }
      if (flexDirection === "row" && justifyContent === "space-between") {
        if (width >= size.width) {
          x = width * -0.5;
          x += nodes.reduce((width, node, currentIndex) => {
            if (currentIndex === index) return node.props.width * 0.5;
            return width + node.props.width;
          }, 0);
        } else {
          // ?
          const spacing = (size.width - width) / nodes.length;
          x = size.width * -0.5;
          x += nodes.reduce((width, node, currentIndex) => {
            if (currentIndex === index) return node.props.width * 0.5;
            return width + node.props.width;
          }, 0);
          if (index > 0) {
            // x += spacing;
          }
        }
      }

      /**
       * row -> alignItems
       */
      if (flexDirection === "row" && alignItems === "start") {
        y = size.height * 0.5 - child.props.height * 0.5;
      }
      if (flexDirection === "row" && alignItems === "center") {
        // @todo test if calculation needs to be made for this
      }
      if (flexDirection === "row" && alignItems === "end") {
        y = size.height * -0.5 + child.props.height * 0.5;
      }
      return [x, y, 0];
    },
    [nodes, size, flexDirection, alignItems, justifyContent]
  );

  return (
    <group
      ref={mergeRefs([groupRef, forwardedRef])}
      key={key}
      position={position}
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
      {React.Children.map(children, (child, index) => {
        return (
          <group key={index} position={getChildPosition(child, index)}>
            {child}
          </group>
        );
      })}
    </group>
  );
}

export default React.forwardRef(Surface);
