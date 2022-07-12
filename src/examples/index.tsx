import React from "react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <main>
      <h1>Examples</h1>
      <ul>
        <li>
          <Link to="/examples/layout">Layout</Link>
        </li>
      </ul>
    </main>
  );
}
