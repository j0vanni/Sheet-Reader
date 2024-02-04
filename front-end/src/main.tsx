import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Piano from "./ts/piano/Piano.tsx";
import SheetMusic from "./ts/SheetMusic/SheetMusic.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SheetMusic />
  </React.StrictMode>
);
