import React from "react";
import Example from "@/components/example";
import { Layer } from "react-xr-ui";
import ViewCode from "@/components/view-code";
import Button from "@/components/button";

export default function RelativeSizing() {
  const [aspectRatio, setAspectRatio] = React.useState(16 / 9);

  return (
    <>
      <Example>
        <Layer width={1} height={0.1} gap={0.05} position-y={0.6}>
          <Button
            width={0.1}
            height={0.1}
            fontSize={0.35}
            textContent="16:9"
            selected={aspectRatio === 16 / 9}
            onClick={() => setAspectRatio(16 / 9)}
          />
          <Button
            width={0.1}
            height={0.1}
            fontSize={0.35}
            textContent="1:1"
            selected={aspectRatio === 1}
            onClick={() => setAspectRatio(1)}
          />
          <Button
            width={0.1}
            height={0.1}
            fontSize={0.35}
            textContent="2:4"
            selected={aspectRatio === 2 / 4}
            onClick={() => setAspectRatio(2 / 4)}
          />
        </Layer>
        <Layer
          height={1}
          aspectRatio={aspectRatio}
          gap={0.1}
          backgroundColor="crimson"
        />
      </Example>
      <ViewCode pathname="aspect-ratio" />
    </>
  );
}
