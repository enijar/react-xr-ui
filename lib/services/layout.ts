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
  if (["column", "column-reverse"].includes(flexDirection)) {
    axis = "height";
    contentSize = childrenHeight;
  }
  if (
    currentChildren.length > 0 &&
    !["space-between", "space-around"].includes(justifyContent)
  ) {
    contentSize += gap * (currentChildren.length - 1);
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
  }

  // Offset x starting position
  if (isReverse) {
    for (let i = 1; i <= index; i++) {
      x -= currentChildren[i - 1][axis] * dir;
    }
  } else {
    for (let i = currentChildren.length - 2; i >= index; i--) {
      x -= currentChildren[i + 1][axis] * dir;
    }
  }

  /**
   * alignItems
   */
  switch (alignItems) {
    case "start":
      y = (size[axis] * 0.5 - currentChildren[index][axis] * 0.5) * dir;
      break;
    case "end":
      y = (currentChildren[index][axis] * 0.5 - size[axis] * 0.5) * dir;
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
