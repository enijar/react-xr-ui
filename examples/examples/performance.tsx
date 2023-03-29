import React from "react";
import { useFrame } from "@react-three/fiber";
import { Layer, LayerProps } from "react-xr-ui";
import Example from "@/components/example";
import ViewCode from "@/components/view-code";
import Button from "@/components/button";

function Nested({
  letter,
  children,
  alignItems = "center",
  justifyContent = "center",
}: {
  letter: string;
  children?: React.ReactNode;
  alignItems?: LayerProps["alignItems"];
  justifyContent?: LayerProps["justifyContent"];
}) {
  return (
    <Layer
      textContent={letter}
      width="90%"
      height="90%"
      backgroundColor="crimson"
      alignItems={alignItems}
      justifyContent={justifyContent}
    >
      <Layer
        textContent={letter}
        width="90%"
        height="90%"
        backgroundColor="blue"
        alignItems={alignItems}
        justifyContent={justifyContent}
        fontSize={0.5}
      >
        <Layer
          textContent={letter}
          width="90%"
          height="90%"
          backgroundColor="green"
          alignItems={alignItems}
          justifyContent={justifyContent}
          fontSize={0.5}
        >
          <Layer
            textContent={letter}
            width="90%"
            height="90%"
            backgroundColor="hotpink"
            alignItems={alignItems}
            justifyContent={justifyContent}
            fontSize={0.5}
          >
            <Layer
              textContent={letter}
              width="90%"
              height="90%"
              backgroundColor="purple"
              alignItems={alignItems}
              justifyContent={justifyContent}
              fontSize={0.5}
            >
              <Layer
                textContent={letter}
                width="90%"
                height="90%"
                backgroundColor="grey"
                alignItems={alignItems}
                justifyContent={justifyContent}
                fontSize={0.5}
              >
                <Layer
                  textContent={letter}
                  width="90%"
                  height="90%"
                  backgroundColor="aliceblue"
                  alignItems={alignItems}
                  justifyContent={justifyContent}
                  fontSize={0.5}
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

const letters: string[] = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function Scene() {
  const [align, setAlign] = React.useState<LayerProps["alignItems"]>("start");
  const [justify, setJustify] =
    React.useState<LayerProps["justifyContent"]>("start");

  const [letter, setLetter] = React.useState(letters[0]);

  const lastFrameTimeRef = React.useRef(Date.now());

  useFrame(() => {
    const now = Date.now();
    if (now - lastFrameTimeRef.current < delay) return;
    lastFrameTimeRef.current = now;
    i++;
    setAlign(aligns[i % aligns.length]);
    setJustify(justifies[i % justifies.length]);
    setLetter(letters[i % letters.length]);
  });

  return (
    <Layer width={1} height={1} backgroundColor="black">
      <Nested letter={letter} alignItems={align} justifyContent={justify}>
        <Nested letter={letter} alignItems={align} justifyContent={justify}>
          <Nested letter={letter} alignItems={align} justifyContent={justify}>
            <Nested letter={letter} alignItems={align} justifyContent={justify}>
              <Nested
                letter={letter}
                alignItems={align}
                justifyContent={justify}
              >
                <Nested
                  letter={letter}
                  alignItems={align}
                  justifyContent={justify}
                >
                  <Nested
                    letter={letter}
                    alignItems={align}
                    justifyContent={justify}
                  >
                    <Nested
                      letter={letter}
                      alignItems={align}
                      justifyContent={justify}
                    >
                      <Nested
                        letter={letter}
                        alignItems={align}
                        justifyContent={justify}
                      >
                        <Nested
                          letter={letter}
                          alignItems={align}
                          justifyContent={justify}
                        >
                          <Nested
                            letter={letter}
                            alignItems={align}
                            justifyContent={justify}
                          />
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
  const [optimizedRendering, setOptimizedRendering] = React.useState(false);

  return (
    <>
      <Example optimizedRendering={optimizedRendering}>
        <group position-y={0.61}>
          <Layer width={1} height={0.2} flexDirection="column" gap={0.025}>
            <Layer width={1} height={0.1} gap={0.05}>
              <Button
                width={0.1}
                height={0.1}
                fontSize={0.5}
                textContent="On"
                selected={optimizedRendering}
                onClick={() => setOptimizedRendering(true)}
              />
              <Button
                width={0.1}
                height={0.1}
                fontSize={0.5}
                textContent="Off"
                selected={!optimizedRendering}
                onClick={() => setOptimizedRendering(false)}
              />
            </Layer>
            <Layer
              width={1}
              height={0.05}
              textContent="Open Dev Tools to see Frame rendering stats"
              fontSize={0.6}
              textAlign="center"
              verticalAlign="middle"
            />
          </Layer>
        </group>
        <Scene />
      </Example>
      <ViewCode pathname="performance" />
    </>
  );
}
