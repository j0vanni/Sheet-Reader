import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Piano from "./ts/piano/Piano.tsx";
import SheetMusic from "./ts/SheetMusic/SheetMusic.tsx";
import "./index.css";
import MainPage from "./ts/MainPage/MainPage.tsx";
import Options from "./ts/Options/Options.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>
);
