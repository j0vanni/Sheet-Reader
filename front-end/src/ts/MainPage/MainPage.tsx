import React from "react";
import "./MainPage.css";
import SheetMusic from "../SheetMusic/SheetMusic";
import Piano from "../Piano/Piano";

const MainPage: React.FC = () => {
  return (
    <div className="container">
      <div className="sm-container">
        <SheetMusic
          settings={{
            timeSignature: "4/4",
            scale: "CMajor",
            clef: "treble",
            notation: ["C2", "D2", "E2", "F2", "G2", "A2", "B2", "C'2"],
            renderOptions: {
              scale: 1.5,
              paddingbottom: 1,
              paddingright: 1,
              paddingleft: 1,
              expandToWidest: true,
              staffwidth: 600,
            },
          }}
        />
        <SheetMusic
          settings={{
            timeSignature: "4/4",
            scale: "CMajor",
            clef: "bass",
            notation: ["C,2", "D,2", "E,2", "F,2", "G,2", "A,2", "B,2", "C,2"],
            renderOptions: {
              scale: 1.5,
              paddingtop: 1,
              paddingright: 1,
              paddingleft: 1,
              staffwidth: 600,
            },
          }}
        />
      </div>
      <div className="piano-container">
        <Piano />
      </div>
    </div>
  );
};

export default MainPage;
