import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Examples from "@/components/examples";
import examples from "@/config/examples";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Router>
    <React.Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Examples />} />
        <Route path="/examples">
          {examples.map((example, index) => {
            const Component = example.component;
            return <Route key={index} path={example.pathname} element={<Component />} />;
          })}
        </Route>
      </Routes>
    </React.Suspense>
  </Router>,
);
