import React from "react";
import { createRoot } from "react-dom/client";
import "modern-normalize";
import App from "./components/App/App.jsx";
import "./styles/index.css";

// import "./test-firebase.js";
// import "./test-auth.js";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
