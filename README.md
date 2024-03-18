# React Three UI

Build UIs with React that work in VR, AR and web contexts.

[**View Live Examples**](https://enijar.github.io/react-xr-ui/)

> We've been using this package for various WebXR projects at [Finer Vision](https://github.com/finer-vision). We think it's a good
> library, so we've open sourced it. If you want more features added or bugs fix please open a pull request or issue

> If you're looking for a library that has more features, we'd highly recommend checking out [@react-three/uikit](https://github.com/pmndrs/uikit) or [@coconut-xr/koestlich](https://github.com/coconut-xr/koestlich)

### Install

```shell
npm add react-xr-ui
```

### Why?

Until [WebXR DOM](https://www.w3.org/TR/webxr-dom-overlays-1/) lands, it's currently not possible to use HTML/CSS to build-out UIs in XR; this
package solves some of the pain points over building UIs in XR.

### Usage

Here is a full basic setup. This renders everything inside a [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
canvas.

The 2D UI is a 1x1 meter red box, with a dark grey border, and a small border radius.

```tsx
import React from "react";
import { BoxLineGeometry } from "three/examples/jsm/geometries/BoxLineGeometry";
import { Canvas } from "@react-three/fiber";
import { Controllers, XR, XRButton } from "@react-three/xr";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { XrUi, Layer } from "react-xr-ui";

function Scene() {
  return (
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
  );
}

export default function Example({ children }: Props) {
  const room = React.useMemo(() => {
    return new BoxLineGeometry(6, 6, 6, 10, 10, 10).translate(0, 3, 0);
  }, []);

  return (
    <>
      <Canvas legacy flat linear gl={{ alpha: false }}>
        <XR>
          <XrUi>
            {/** Background, cameras, controls and lights */}
            <color args={["#333333"]} attach="background" />
            <lineSegments geometry={room}>
              <lineBasicMaterial color="#c0c0c0" />
            </lineSegments>
            <PerspectiveCamera makeDefault position={[0, 1.6, 0]} />
            <OrbitControls makeDefault target={[0, 1, -1.8]} />
            <ambientLight />
            <Controllers />

            {/** 3D Stuff */}
            <></>

            {/** 2D UI */}
            <Scene />
          </XrUi>
        </XR>
      </Canvas>
      <XRButton
        style={{
          position: "absolute",
          bottom: "1em",
          color: "black",
          left: "50%",
          translate: "-50%",
          padding: "0.5em 1em",
          cursor: "pointer",
        }}
        mode="VR"
        sessionInit={{
          optionalFeatures: [
            "local-floor",
            "bounded-floor",
            "hand-tracking",
            "layers",
          ],
        }}
      >
        Enter Immersive VR
      </XRButton>
    </>
  );
}
```

### Roadmap to 1.0.0

- [x] `backgroundColor`
- [x] `backgroundImage`
- [x] `backgroundSize`
- [x] `zIndex`
- [x] borders (radius, color, width, image)
- [x] automatic children sizing
- [ ] overflow: auto (scroll), hidden
- [x] interactive controls for VR
- [x] typography
- [x] flexbox
- [x] publish NPM package
- [ ] flex wrap
- [x] less boilerplate setup code
- [ ] 1.0 release 🎉
- [ ] Optimise rendering by reducing no. canvas elements created
- [ ] Add `onClick` to `Interaction` component
- [ ] Auto width/height calculation of `Layer` component based on
      content size

### Contributing

```shell
nvm use # use an exact Node version
npm install
npm start # dev server localhost:8080
```
