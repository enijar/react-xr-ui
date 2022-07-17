import React from "react";
import { Link } from "react-router-dom";
import examples from "@/config/examples";

export default function Examples() {
  return (
    <main>
      <h1>Examples</h1>
      <ul>
        {examples.map((example, index) => {
          return (
            <li key={index}>
              <Link to={`/examples/${example.pathname}`}>{example.title}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
