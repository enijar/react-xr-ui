import React from "react";
import Example from "@/components/example";
import Surface from "@/lib/components/surface";
import Text from "@/lib/components/text";

export default function Typography() {
  return (
    <Example>
      <Surface
        backgroundColor="#777777"
        width={1}
        height={1}
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        gap={0.05}
      >
        <Surface
          width={0.5}
          height={0.5}
          backgroundColor="#555555"
          alignItems="start"
        >
          <Text fontSize={0.1} color="white" textAlign="center">
            {`Some\nText`}
          </Text>
        </Surface>
      </Surface>
    </Example>
  );
}
