import React from "react";

export default function useRenderKey(deps: React.DependencyList | undefined) {
  const lastKey = React.useRef(0);

  return React.useMemo(() => {
    let key = ++lastKey.current;
    if (key > 1000) {
      key = 0;
      lastKey.current = key;
    }
    return key;
  }, deps);
}
