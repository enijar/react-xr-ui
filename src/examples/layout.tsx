import React from "react";
import Example from "@/components/example";
import { Layer, LayerProps } from "../../lib";
import Button from "@/components/button";

export default function Layout() {
  const [flexDirection, setFlexDirection] =
    React.useState<LayerProps["flexDirection"]>("row");
  const [alignItems, setAlignItems] =
    React.useState<LayerProps["alignItems"]>("center");
  const [justifyContent, setJustifyContent] =
    React.useState<LayerProps["justifyContent"]>("space-around");

  return (
    <Example>
      {/*<Layer*/}
      {/*  width={1.5}*/}
      {/*  height={0.2}*/}
      {/*  flexDirection="column"*/}
      {/*  justifyContent="space-between"*/}
      {/*  position-y={0.625}*/}
      {/*>*/}
      {/*  <Layer width={0.8} height={0.05} justifyContent="space-around">*/}
      {/*    <Button*/}
      {/*      width={0.1}*/}
      {/*      height={0.05}*/}
      {/*      fontSize={0.5}*/}
      {/*      textContent="row"*/}
      {/*      selected={flexDirection === "row"}*/}
      {/*      onClick={() => setFlexDirection("row")}*/}
      {/*    />*/}
      {/*    <Button*/}
      {/*      width={0.2}*/}
      {/*      height={0.05}*/}
      {/*      fontSize={0.5}*/}
      {/*      textContent="row-reverse"*/}
      {/*      selected={flexDirection === "row-reverse"}*/}
      {/*      onClick={() => setFlexDirection("row-reverse")}*/}
      {/*    />*/}
      {/*    <Button*/}
      {/*      width={0.15}*/}
      {/*      height={0.05}*/}
      {/*      fontSize={0.5}*/}
      {/*      textContent="column"*/}
      {/*      selected={flexDirection === "column"}*/}
      {/*      onClick={() => setFlexDirection("column")}*/}
      {/*    />*/}
      {/*    <Button*/}
      {/*      width={0.25}*/}
      {/*      height={0.05}*/}
      {/*      fontSize={0.5}*/}
      {/*      textContent="column-reverse"*/}
      {/*      selected={flexDirection === "column-reverse"}*/}
      {/*      onClick={() => setFlexDirection("column-reverse")}*/}
      {/*    />*/}
      {/*  </Layer>*/}
      {/*  <Layer width={0.85} height={0.05} justifyContent="space-around">*/}
      {/*    <Button*/}
      {/*      width={0.25}*/}
      {/*      height={0.05}*/}
      {/*      fontSize={0.5}*/}
      {/*      textContent="alignItems: start"*/}
      {/*      selected={alignItems === "start"}*/}
      {/*      onClick={() => setAlignItems("start")}*/}
      {/*    />*/}
      {/*    <Button*/}
      {/*      width={0.25}*/}
      {/*      height={0.05}*/}
      {/*      fontSize={0.5}*/}
      {/*      textContent="alignItems: center"*/}
      {/*      selected={alignItems === "center"}*/}
      {/*      onClick={() => setAlignItems("center")}*/}
      {/*    />*/}
      {/*    <Button*/}
      {/*      width={0.25}*/}
      {/*      height={0.05}*/}
      {/*      fontSize={0.5}*/}
      {/*      textContent="alignItems: end"*/}
      {/*      selected={alignItems === "end"}*/}
      {/*      onClick={() => setAlignItems("end")}*/}
      {/*    />*/}
      {/*  </Layer>*/}
      {/*  <Layer width={1.6} height={0.05} justifyContent="space-around">*/}
      {/*    <Button*/}
      {/*      width={0.25}*/}
      {/*      height={0.05}*/}
      {/*      fontSize={0.5}*/}
      {/*      textContent="justifyContent: start"*/}
      {/*      selected={justifyContent === "start"}*/}
      {/*      onClick={() => setJustifyContent("start")}*/}
      {/*    />*/}
      {/*    <Button*/}
      {/*      width={0.35}*/}
      {/*      height={0.05}*/}
      {/*      fontSize={0.5}*/}
      {/*      textContent="justifyContent: space-around"*/}
      {/*      selected={justifyContent === "space-around"}*/}
      {/*      onClick={() => setJustifyContent("space-around")}*/}
      {/*    />*/}
      {/*    <Button*/}
      {/*      width={0.35}*/}
      {/*      height={0.05}*/}
      {/*      fontSize={0.5}*/}
      {/*      textContent="justifyContent: space-between"*/}
      {/*      selected={justifyContent === "space-between"}*/}
      {/*      onClick={() => setJustifyContent("space-between")}*/}
      {/*    />*/}
      {/*    <Button*/}
      {/*      width={0.25}*/}
      {/*      height={0.05}*/}
      {/*      fontSize={0.5}*/}
      {/*      textContent="justifyContent: center"*/}
      {/*      selected={justifyContent === "center"}*/}
      {/*      onClick={() => setJustifyContent("center")}*/}
      {/*    />*/}
      {/*    <Button*/}
      {/*      width={0.25}*/}
      {/*      height={0.05}*/}
      {/*      fontSize={0.5}*/}
      {/*      textContent="justifyContent: end"*/}
      {/*      selected={justifyContent === "end"}*/}
      {/*      onClick={() => setJustifyContent("end")}*/}
      {/*    />*/}
      {/*  </Layer>*/}
      {/*</Layer>*/}
      <Layer
        width={1}
        height={1.4}
        borderWidth={0.025}
        borderColor="rgba(0, 0, 0, 0.25)"
        borderRadius={0.05}
        backgroundColor="#444444"
        flexDirection="row"
        alignItems="start"
        justifyContent="start"
        // gap={0.01}
        // flexDirection={flexDirection}
        // alignItems={alignItems}
        // justifyContent={justifyContent}
      >
        <Layer width={0.1} height={0.1} backgroundColor="red" />
        <Layer width={0.2} height={0.2} backgroundColor="green" />
        <Layer width={0.3} height={0.3} backgroundColor="lightblue" />
      </Layer>
    </Example>
  );
}
