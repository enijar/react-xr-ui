import * as React from "react";

let lastRenderOrder = -1;

export default function useRenderOrder() {
  return React.useMemo(() => {
    return ++lastRenderOrder;
  }, []);
}
