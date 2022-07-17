import React from "react";
import Example from "@/examples/example";
import Surface from "@/lib/components/surface";

export default function Typography() {
  return (
    <Example>
      <Surface
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
    </Example>
  );
}
