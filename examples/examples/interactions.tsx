import React from "react";
import { Interaction, Layer } from "react-xr-ui";
import Example from "@/components/example";
import ViewCode from "@/components/view-code";

export default function Interactions() {
  const [over, setOver] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  return (
    <>
      <Example>
        <Layer height={0.1} position-y={0.625} gap={0.05}>
          <Layer
            width="15%"
            height="100%"
            backgroundColor="#000000"
            textContent={over ? "Over" : "Out"}
            fontSize={0.4}
            textAlign="center"
            verticalAlign="middle"
          />
          <Layer
            width="15%"
            height="100%"
            backgroundColor="#000000"
            textContent={down ? "Down" : "Up"}
            fontSize={0.4}
            textAlign="center"
            verticalAlign="middle"
          />
          <Layer
            width="30%"
            height="100%"
            backgroundColor="#000000"
            textContent={`x: ${position.x} y: ${position.y}`}
            fontSize={0.4}
            textAlign="center"
            verticalAlign="middle"
          />
        </Layer>

        <Interaction
          onOver={() => setOver(true)}
          onOut={() => setOver(false)}
          onDown={() => setDown(true)}
          onUp={() => setDown(false)}
          onMove={(intersection) => {
            setPosition({
              x: parseFloat(intersection.uv.x.toFixed(2)),
              y: parseFloat(intersection.uv.y.toFixed(2)),
            });
          }}
        >
          <Layer backgroundColor="crimson" textContent="Interact with me" verticalAlign="middle" textAlign="center" />
        </Interaction>
      </Example>
      <ViewCode pathname="interactions" />
    </>
  );
}
