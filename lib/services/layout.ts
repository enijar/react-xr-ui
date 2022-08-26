import { Child, LayerProps, Size } from "../types";

type Axis = "width" | "height";

type Args = {
  currentChildren: Child[];
  index: number;
  flexDirection: LayerProps["flexDirection"];
  alignItems: LayerProps["alignItems"];
  justifyContent: LayerProps["justifyContent"];
  gap: LayerProps["gap"];
  size: Size;
};

export default function layout({
  currentChildren,
  index,
  flexDirection,
  alignItems,
  justifyContent,
  gap,
  size,
}: Args): [x: number, y: number] {
  const childrenWidth = currentChildren.reduce((width, child) => {
    return width + child.width;
  }, 0);
  const childrenHeight = currentChildren.reduce((height, child) => {
    return height + child.height;
  }, 0);
  let x = 0;
  let y = 0;
  let contentSize = childrenWidth;
  let axis: Axis = "width";
  let oppositeAxis: Axis = "height";
  if (["column", "column-reverse"].includes(flexDirection)) {
    axis = "height";
    oppositeAxis = "width";
    contentSize = childrenHeight;
  }
  if (
    currentChildren.length > 0 &&
    !["space-between", "space-around"].includes(justifyContent)
  ) {
    contentSize += gap * (currentChildren.length - 1);
  }

  if (["space-between", "space-around"].includes(justifyContent)) {
    gap = 0;
  }

  const isReverse = ["row-reverse", "column-reverse"].includes(flexDirection);
  const isColumn = ["column", "column-reverse"].includes(flexDirection);

  let dir = 1;
  if (isColumn) {
    dir = -1;
  }

  /**
   * justifyContent
   */
  switch (justifyContent) {
    case "start":
      x =
        ((size[axis] - currentChildren[index][axis]) * 0.5 -
          (size[axis] - contentSize)) *
        dir;
      break;
    case "end":
      x = (size[axis] * 0.5 - currentChildren[index][axis] * 0.5) * dir;
      break;
    case "center":
      x = (contentSize * 0.5 - currentChildren[index][axis] * 0.5) * dir;
      break;
    case "space-between":
      if (currentChildren.length > 1) {
        x = (size[axis] * 0.5 - currentChildren[index][axis] * 0.5) * dir;
      }
      break;
    case "space-around":
      if (currentChildren.length > 1) {
        x = (size[axis] * 0.5 - currentChildren[index][axis] * 0.5) * dir;
      }
      break;
  }

  let spacing = 0;
  if (currentChildren.length > 1) {
    if (justifyContent === "space-between") {
      spacing =
        Math.max(0, size[axis] - contentSize) /
        Math.max(1, currentChildren.length - 1);
    }
    if (justifyContent === "space-around") {
      spacing =
        Math.max(0, size[axis] - contentSize) /
        Math.max(1, currentChildren.length + 1);
    }
  }

  if (justifyContent === "space-around") {
    x -= spacing * dir;
  }

  if (isReverse) {
    for (let i = 1; i <= index; i++) {
      x -= (currentChildren[i - 1][axis] + spacing + gap) * dir;
    }
  } else {
    for (let i = currentChildren.length - 2; i >= index; i--) {
      x -= (currentChildren[i + 1][axis] + spacing + gap) * dir;
    }
  }

  /**
   * alignItems
   */
  switch (alignItems) {
    case "start":
      y =
        (size[oppositeAxis] * 0.5 -
          currentChildren[index][oppositeAxis] * 0.5) *
        dir;
      break;
    case "end":
      y =
        (currentChildren[index][oppositeAxis] * 0.5 -
          size[oppositeAxis] * 0.5) *
        dir;
      break;
    case "center":
      y = 0;
      break;
  }

  if (["column", "column-reverse"].includes(flexDirection)) {
    return [y, x];
  }
  return [x, y];
}
