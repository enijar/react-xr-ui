import React from "react";
import Example from "@/components/example";
import { Layer } from "react-xr-ui";
import Button from "@/components/button";
import ViewCode from "@/components/view-code";

export default function Typography() {
  const [fontFamily, setFontFamily] = React.useState("system-ui");

  return (
    <>
      <Example>
        <Layer
          width={1.3}
          height={0.1}
          justifyContent="space-around"
          position-y={0.6}
        >
          <Button
            textContent="system-ui"
            fontFamily="system-ui"
            selected={fontFamily === "system-ui"}
            onClick={() => setFontFamily("system-ui")}
            fontSize={0.3}
            width={0.2}
            height={0.1}
          />
          <Button
            textContent="Arial"
            fontFamily="Arial, sans-serif"
            selected={fontFamily === "Arial"}
            onClick={() => setFontFamily("Arial, sans-serif")}
            fontSize={0.3}
            width={0.2}
            height={0.1}
          />
          <Button
            textContent="Times New Roman"
            fontFamily="Times New Roman, serif"
            selected={fontFamily === "Times New Roman, serif"}
            onClick={() => setFontFamily("Times New Roman, serif")}
            fontSize={0.3}
            width={0.3}
            height={0.1}
          />
          <Button
            textContent="Courier New"
            fontFamily="Courier New, monospace"
            selected={fontFamily === "Courier New, monospace"}
            onClick={() => setFontFamily("Courier New, monospace")}
            fontSize={0.3}
            width={0.25}
            height={0.1}
          />
          <Button
            textContent="Brush Script MT"
            fontFamily="Brush Script MT, cursive"
            selected={fontFamily === "Brush Script MT, cursive"}
            onClick={() => setFontFamily("Brush Script MT, cursive")}
            fontSize={0.3}
            width={0.25}
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
          fontFamily={fontFamily}
          fontSize={0.1}
          textContent={`This font will scale to 10% the size of the smallest dimension of this layer`}
          textAlign="center"
          verticalAlign="middle"
          color="crimson"
        />
        <Layer
          position-x={0.55}
          width={1}
          height={1}
          borderWidth={0.025}
          borderColor="#222222"
          borderRadius={0.05}
          backgroundColor="#444444"
          fontFamily={fontFamily}
          fontSize="50px"
          textContent={`This font is fixed to 50px`}
          textAlign="center"
          verticalAlign="middle"
          color="crimson"
        />
      </Example>
      <ViewCode pathname="typography" />
    </>
  );
}
