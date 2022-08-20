import React from "react";

type Example = {
  title: string;
  pathname: string;
  component: React.LazyExoticComponent<any>;
};

const examples: Example[] = [
  {
    title: "Background",
    pathname: "background",
    component: React.lazy(() => import("@/examples/background")),
  },
  {
    title: "Layout",
    pathname: "layout",
    component: React.lazy(() => import("@/examples/layout")),
  },
];

export default examples;
