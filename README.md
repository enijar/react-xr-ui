# React Three UI

Build UIs with React that work in VR, AR and web contexts.

[**View Live Examples**](https://enijar.github.io/react-three-ui/)

> ⚠️ Not ready for production use

> Whilst this package is open, it's primary users are for devs at [Finer Vision](https://github.com/finer-vision). We're
> keen on opening this up to the wider open-source community, so open a PR or issue if you want us to add missing features
> to the package.

### Install

```shell
npm add react-xr-ui
```

### Usage

Here is a full basic setup. This renders everything inside a [@react-three/xr](https://github.com/pmndrs/react-xr)
canvas.

The 2D UI is a 1x1 meter red box, with a dark grey border, and a small border radius.

```tsx
import React from "react";
import { BoxLineGeometry } from "three/examples/jsm/geometries/BoxLineGeometry";
import { Layer } from "react-xr-ui";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

function Scene() {
  useFrame((state) => {
    update(state);
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.6, 0]} />
      <OrbitControls makeDefault target={[0, 1, -1.8]} />
      <ambientLight />
      <DefaultXRControllers />

      {/** 3D Stuff */}
      <></>

      {/** 2D UI */}
      <group position={[0, 1, -1.88]}>
        <Layer
          width={1}
          height={1}
          backgroundColor="crimson"
          borderRadius={0.1}
          borderWidth={0.02}
          borderColor="#222222"
        />
      </group>
    </>
  );
}

function App() {
  const room = React.useMemo(() => {
    return new BoxLineGeometry(6, 6, 6, 10, 10, 10).translate(0, 3, 0);
  }, []);

  return (
    <Canvas legacy flat linear gl={{ alpha: false }}>
      {/** Background, cameras, controls and lights */}
      <color args={["#333333"]} attach="background" />
      <lineSegments geometry={room}>
        <lineBasicMaterial color="#c0c0c0" />
      </lineSegments>
      <Scene />
    </Canvas>
  );
}
```

### Roadmap

- [x] `backgroundColor`
- [x] `backgroundImage`
- [x] `backgroundSize`
- [x] `zIndex`
- [x] borders (radius, color, width, image)
- [ ] automatic children sizing
- [ ] overflow: auto (scroll), hidden
- [ ] interactive controls for VR
- [x] typography
- [x] flexbox
- [x] publish NPM package

### Contributing

```shell
nvm use # use an exact Node version
npm install
npm start # dev server localhost:8080
```
