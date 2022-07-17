import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.querySelector("#root"));

const Index = React.lazy(() => import("./examples/index"));
const Flexbox = React.lazy(() => import("./examples/flexbox"));
const Typography = React.lazy(() => import("./examples/typography"));

root.render(
  <Router>
    <React.Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/examples">
          <Route path="flexbox" element={<Flexbox />} />
          <Route path="typography" element={<Typography />} />
        </Route>
      </Routes>
    </React.Suspense>
  </Router>
);
