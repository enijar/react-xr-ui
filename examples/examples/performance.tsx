import React from "react";
import Example from "@/components/example";
import { Layer, LayerProps } from "react-xr-ui";
import ViewCode from "@/components/view-code";
import { useFrame } from "@react-three/fiber";

function Nested({
  children,
  alignItems = "center",
  justifyContent = "center",
}: {
  children?: React.ReactNode;
  alignItems?: LayerProps["alignItems"];
  justifyContent?: LayerProps["justifyContent"];
}) {
  return (
    <Layer
      width="90%"
      height="90%"
      backgroundColor="crimson"
      alignItems={alignItems}
      justifyContent={justifyContent}
    >
      <Layer
        width="90%"
        height="90%"
        backgroundColor="blue"
        alignItems={alignItems}
        justifyContent={justifyContent}
        fontSize={0.5}
        textContent="A"
      >
        <Layer
          width="90%"
          height="90%"
          backgroundColor="green"
          alignItems={alignItems}
          justifyContent={justifyContent}
          fontSize={0.5}
          textContent="A"
        >
          <Layer
            width="90%"
            height="90%"
            backgroundColor="hotpink"
            alignItems={alignItems}
            justifyContent={justifyContent}
            fontSize={0.5}
            textContent="A"
          >
            <Layer
              width="90%"
              height="90%"
              backgroundColor="purple"
              alignItems={alignItems}
              justifyContent={justifyContent}
              fontSize={0.5}
              textContent="A"
            >
              <Layer
                width="90%"
                height="90%"
                backgroundColor="grey"
                alignItems={alignItems}
                justifyContent={justifyContent}
                fontSize={0.5}
                textContent="A"
              >
                <Layer
                  width="90%"
                  height="90%"
                  backgroundColor="aliceblue"
                  alignItems={alignItems}
                  justifyContent={justifyContent}
                  fontSize={0.5}
                  textContent="A"
                >
                  {children}
                </Layer>
              </Layer>
            </Layer>
          </Layer>
        </Layer>
      </Layer>
    </Layer>
  );
}

const aligns: LayerProps["alignItems"][] = ["start", "center", "end"];
const justifies: LayerProps["justifyContent"][] = ["start", "center", "end"];

let i = 0;

const delay = 200;

function Scene() {
  const [align, setAlign] = React.useState<LayerProps["alignItems"]>("start");
  const [justify, setJustify] =
    React.useState<LayerProps["justifyContent"]>("start");

  const lastFrameTimeRef = React.useRef(Date.now());

  useFrame(() => {
    const now = Date.now();
    if (now - lastFrameTimeRef.current < delay) return;
    lastFrameTimeRef.current = now;
    i++;
    setAlign(aligns[i % aligns.length]);
    setJustify(justifies[i % justifies.length]);
  });

  return (
    <Layer width={1} height={1} backgroundColor="black">
      <Nested alignItems={align} justifyContent={justify}>
        <Nested alignItems={align} justifyContent={justify}>
          <Nested alignItems={align} justifyContent={justify}>
            <Nested alignItems={align} justifyContent={justify}>
              <Nested alignItems={align} justifyContent={justify}>
                <Nested alignItems={align} justifyContent={justify}>
                  <Nested alignItems={align} justifyContent={justify}>
                    <Nested alignItems={align} justifyContent={justify}>
                      <Nested alignItems={align} justifyContent={justify}>
                        <Nested alignItems={align} justifyContent={justify}>
                          <Nested alignItems={align} justifyContent={justify} />
                        </Nested>
                      </Nested>
                    </Nested>
                  </Nested>
                </Nested>
              </Nested>
            </Nested>
          </Nested>
        </Nested>
      </Nested>
    </Layer>
  );
}

export default function Performance() {
  return (
    <>
      <Example>
        <Scene />
      </Example>
      <ViewCode pathname="performance" />
    </>
  );
}
