import React from "react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <main>
      <h1>Examples</h1>
      <ul>
        <li>
          <Link to="/examples/flexbox">Flexbox</Link>
        </li>
      </ul>
    </main>
  );
}
