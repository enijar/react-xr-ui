import React from "react";

type Example = {
  title: string;
  pathname: string;
  component: React.LazyExoticComponent<any>;
};

const examples: Example[] = [
  {
    title: "Flexbox",
    pathname: "flexbox",
    component: React.lazy(() => import("@/examples/flexbox")),
  },
  {
    title: "Typography",
    pathname: "typography",
    component: React.lazy(() => import("@/examples/typography")),
  },
];

export default examples;
