import React from "react";

type Example = {
  title: string;
  pathname: string;
  component: React.LazyExoticComponent<any>;
};

const examples: Example[] = [
  {
    title: "Basic",
    pathname: "basic",
    component: React.lazy(() => import("@/examples/basic")),
  },
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
  {
    title: "Typography",
    pathname: "typography",
    component: React.lazy(() => import("@/examples/typography")),
  },
  {
    title: "Animation",
    pathname: "animation",
    component: React.lazy(() => import("@/examples/animation")),
  },
  {
    title: "Complex UI",
    pathname: "complex-ui",
    component: React.lazy(() => import("@/examples/complex-ui")),
  },
  {
    title: "Padding",
    pathname: "padding",
    component: React.lazy(() => import("@/examples/padding")),
  },
];

export default examples;
