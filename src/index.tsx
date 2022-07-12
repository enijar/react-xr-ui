import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.querySelector("#root"));

const Layout = React.lazy(() => import("./examples/layout"));

root.render(
  <Router>
    <Routes>
      <Route path="/examples">
        <Route path="layout" element={<Layout />} />
      </Route>
    </Routes>
  </Router>
);
