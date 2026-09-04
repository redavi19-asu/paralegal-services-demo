import React from "react";
import ReactDOM from "react-dom/client";
import ParalegalLanding from "./App.jsx";
import { removeLegacyName } from "./legacyNameCleanup.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ParalegalLanding />
  </React.StrictMode>
);

removeLegacyName();
