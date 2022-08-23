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
  let axisInverted: Axis = "height";
  if (["column", "column-reverse"].includes(flexDirection)) {
    axis = "height";
    axisInverted = "width";
    contentSize = childrenHeight;
  }
  if (
    currentChildren.length > 0 &&
    !["space-between", "space-around"].includes(justifyContent)
  ) {
    contentSize += gap * (currentChildren.length - 1);
  }
  /**
   * justifyContent
   */
  if (justifyContent === "start") {
    x = size[axis] * 0.5 + currentChildren[0][axis] * 0.5 - size[axis];
    if (flexDirection === "column") {
      x = size[axis] * 0.5 + currentChildren[0][axis] * 0.5 - contentSize;
    }
    for (let i = 1; i <= index; i++) {
      x +=
        currentChildren[i - 1][axis] * 0.5 +
        currentChildren[i][axis] * 0.5 +
        gap;
    }
  }
  if (justifyContent === "center") {
    x = currentChildren[0][axis] * 0.5 - contentSize * 0.5;
    for (let i = 1; i <= index; i++) {
      x +=
        currentChildren[i - 1][axis] * 0.5 +
        currentChildren[i][axis] * 0.5 +
        gap;
    }
  }
  if (justifyContent === "end") {
    x = size[axis] * 0.5 + currentChildren[0][axis] * 0.5 - contentSize;
    if (flexDirection === "column") {
      x = size[axis] * 0.5 + currentChildren[0][axis] * 0.5 - size[axis];
    }
    for (let i = 1; i <= index; i++) {
      x +=
        currentChildren[i - 1][axis] * 0.5 +
        currentChildren[i][axis] * 0.5 +
        gap;
    }
  }
  if (justifyContent === "space-between") {
    if (contentSize >= size[axis]) {
      x = size[axis] * 0.5 + currentChildren[0][axis] * 0.5 - size[axis];
      for (let i = 1; i <= index; i++) {
        x +=
          currentChildren[i - 1][axis] * 0.5 + currentChildren[i][axis] * 0.5;
      }
    } else {
      let spacing = Math.max(0, size[axis] - contentSize);
      if (currentChildren.length === 0) {
        spacing = 0;
      } else if (spacing > 0) {
        spacing /= currentChildren.length - 1;
      }
      x = size[axis] * 0.5 + currentChildren[0][axis] * 0.5 - size[axis];
      for (let i = 1; i <= index; i++) {
        x +=
          currentChildren[i - 1][axis] * 0.5 +
          currentChildren[i][axis] * 0.5 +
          spacing;
      }
    }
  }
  if (justifyContent === "space-around") {
    if (contentSize >= size[axis]) {
      x = size[axis] * 0.5 + currentChildren[0][axis] * 0.5 - size[axis];
      for (let i = 1; i <= index; i++) {
        x +=
          currentChildren[i - 1][axis] * 0.5 + currentChildren[i][axis] * 0.5;
      }
    } else {
      let spacing = Math.max(0, size[axis] - contentSize);
      if (currentChildren.length === 0) {
        spacing = 0;
      } else if (spacing > 0) {
        spacing /= currentChildren.length + 1;
      }
      x = size[axis] * 0.5 + currentChildren[0][axis] * 0.5 - size[axis];
      x += spacing;
      for (let i = 1; i <= index; i++) {
        x +=
          currentChildren[i - 1][axis] * 0.5 +
          currentChildren[i][axis] * 0.5 +
          spacing;
      }
    }
  }
  /**
   * alignItems
   */
  if (alignItems === "start") {
    if (["row", "row-reverse"].includes(flexDirection)) {
      y = size[axisInverted] * 0.5 - currentChildren[index][axisInverted] * 0.5;
    }
    if (["column", "column-reverse"].includes(flexDirection)) {
      y =
        size[axisInverted] * -0.5 + currentChildren[index][axisInverted] * 0.5;
    }
  }
  if (alignItems === "center") {
    // No calculation needed
  }
  if (alignItems === "end") {
    if (["row", "row-reverse"].includes(flexDirection)) {
      y =
        size[axisInverted] * -0.5 + currentChildren[index][axisInverted] * 0.5;
    }
    if (["column", "column-reverse"].includes(flexDirection)) {
      y = size[axisInverted] * 0.5 - currentChildren[index][axisInverted] * 0.5;
    }
  }
  if (["column", "column-reverse"].includes(flexDirection)) {
    return [y, x];
  }

  return [x, y];
}
