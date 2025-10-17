import React from "react";
import { createRoot } from "react-dom/client";
import "modern-normalize";
import App from "./components/App/App.jsx";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
