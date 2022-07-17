import React from "react";
import Example from "@/components/example";
import Surface from "@/lib/components/surface";

export default function Flexbox() {
  return (
    <Example>
      <Surface
        position={[-0.52, 0, 0]}
        backgroundColor="#777777"
        width={1}
        height={1}
        justifyContent="space-between"
        flexDirection="row"
        alignItems="center"
      >
        <Surface width={0.3} height={0.3} backgroundColor="red" />
        <Surface width={0.3} height={0.3} backgroundColor="green" />
        <Surface width={0.3} height={0.3} backgroundColor="blue" />
      </Surface>
      <Surface
        position={[0.52, 0, 0]}
        backgroundColor="#777777"
        width={1}
        height={1}
        justifyContent="space-around"
        flexDirection="column"
        alignItems="center"
      >
        <Surface width={0.3} height={0.3} backgroundColor="red" />
        <Surface width={0.3} height={0.3} backgroundColor="green" />
        <Surface width={0.3} height={0.3} backgroundColor="blue" />
      </Surface>
    </Example>
  );
}
