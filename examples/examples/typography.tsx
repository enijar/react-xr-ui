import React from "react";
import Example from "@/components/example";
import { Layer } from "react-xr-ui";
import Button from "@/components/button";
import ViewCode from "@/components/view-code";

export default function Typography() {
  const [fontFamily, setFontFamily] = React.useState(() => {
    return {
      name: "Roboto",
      url: "https://themes.googleusercontent.com/static/fonts/roboto/v9/zN7GBFwfMP4uA6AR0HCoLQ.ttf",
    };
  });

  return (
    <>
      <Example>
        <Layer width={1} height={0.1} gap={0.05} position-y={0.6}>
          <Button
            textContent="Roboto"
            fontFamily="https://themes.googleusercontent.com/static/fonts/roboto/v9/zN7GBFwfMP4uA6AR0HCoLQ.ttf"
            selected={fontFamily.name === "Roboto"}
            onClick={() =>
              setFontFamily({
                name: "Roboto",
                url: "https://themes.googleusercontent.com/static/fonts/roboto/v9/zN7GBFwfMP4uA6AR0HCoLQ.ttf",
              })
            }
            fontSize={0.3}
            width={0.2}
            height={0.1}
          />
          <Button
            textContent="Averia Serif Libre"
            selected={fontFamily.name === "Averia Serif Libre"}
            onClick={() =>
              setFontFamily({
                name: "Averia Serif Libre",
                url: "https://themes.googleusercontent.com/static/fonts/averiaseriflibre/v2/fdtF30xa_Erw0zAzOoG4BeKzPr0x8JMzFIz_Js1kWgQ.ttf",
              })
            }
            fontSize={0.3}
            width={0.3}
            height={0.1}
          />
        </Layer>
        <Layer
          position-x={-0.55}
          width={1}
          height={1}
          borderWidth={0.025}
          borderColor="#222222"
          borderRadius={0.05}
          backgroundColor="#444444"
          flexDirection="column"
          justifyContent="space-around"
        >
          <Layer
            width="100%"
            aspectRatio={1 / 4}
            borderWidth={0.025}
            borderColor="#222222"
            borderRadius={0.05}
            backgroundColor="#666666"
            fontFamily={fontFamily.url}
            fontSize={0.12}
            textContent={`This font will scale to 12% of the smallest dimension in this layer`}
            textAlign="center"
            verticalAlign="middle"
            color="white"
          />
          <Layer
            width="100%"
            aspectRatio={1 / 4}
            borderWidth={0.025}
            borderColor="#222222"
            borderRadius={0.05}
            backgroundColor="#888888"
            fontFamily={fontFamily.url}
            fontSize={0.12}
            textContent={`Hello there,\nHere's a new line.`}
            textAlign="center"
            verticalAlign="middle"
            color="white"
          />
          <Layer
            width="100%"
            aspectRatio={1 / 4}
            borderWidth={0.025}
            borderColor="#222222"
            borderRadius={0.05}
            backgroundColor="#888888"
            fontFamily={fontFamily.url}
            fontSize={0.12}
            overflowWrap="break-word"
            textContent={`Here's some automatic wrapping:\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices in nulla ornare maximus. Proin vulputate libero ac enim volutpat volutpat. Etiam porta nulla interdum orci semper, in malesuada magna vulputate.`}
            textAlign="center"
            verticalAlign="middle"
            color="white"
          />
        </Layer>
        <Layer
          position-x={0.55}
          width={1}
          height={1}
          borderWidth={0.025}
          borderColor="#222222"
          borderRadius={0.05}
          backgroundColor="#444444"
          fontFamily={fontFamily.url}
          fontSize="16px"
          textContent={`This font is fixed to 16px`}
          textAlign="center"
          verticalAlign="middle"
          color="crimson"
        />
      </Example>
      <ViewCode pathname="typography" />
    </>
  );
}
