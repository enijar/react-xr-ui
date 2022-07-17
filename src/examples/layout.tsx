import React from "react";
import Example from "@/examples/example";
import Surface from "@/lib/components/surface";

const CHILD_SIZE = 0.175;

export default function Layout() {
  return (
    <Example>
      <Surface
        backgroundColor="crimson"
        width={1}
        height={1}
        justifyContent="space-between"
        flexDirection="row"
        alignItems="center"
      >
        <Surface
          width={CHILD_SIZE * 2}
          height={CHILD_SIZE}
          backgroundSize="cover"
          backgroundColor="green"
          backgroundImage="./assets/images/landscape.png"
        />
        <Surface
          width={CHILD_SIZE}
          height={CHILD_SIZE}
          backgroundSize="cover"
          backgroundColor="green"
          backgroundImage="./assets/images/robot.png"
        />
        <Surface
          width={CHILD_SIZE}
          height={CHILD_SIZE * 2}
          backgroundSize="cover"
          backgroundColor="green"
          backgroundImage="./assets/images/portrait.png"
        />
        <Surface
          width={CHILD_SIZE}
          height={CHILD_SIZE}
          backgroundSize="cover"
          backgroundColor="green"
          backgroundImage="./assets/images/robot.png"
        />
      </Surface>
    </Example>
  );
}
