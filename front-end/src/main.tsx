import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Piano from "./Components/Piano/Piano.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Piano />
  </React.StrictMode>
);
