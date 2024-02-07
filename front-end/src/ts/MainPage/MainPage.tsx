import React from "react";
import "./MainPage.css";
import SheetMusic from "../SheetMusic/SheetMusic";
import Piano from "../Piano/Piano";

const MainPage: React.FC = () => {
  return (
    <div className="container">
      <SheetMusic
        settings={{
          timeSignature: "4/4",
          scale: "CMajor",
          clef: "treble",
          notation: "C2 D2 E2 F2 G2 A2 B2 C2 D2 E2 F2 G2 A2 B2",
          renderOptions: {
            scale: 2,
            paddingbottom: 1,
            paddingright: 1,
            paddingleft: 1,
          },
        }}
      />
      <SheetMusic
        settings={{
          timeSignature: "4/4",
          scale: "CMajor",
          clef: "bass",
          notation: "CDEFGAB",
          renderOptions: {
            scale: 2,
            paddingtop: 1,
            paddingright: 1,
            paddingleft: 1,
          },
        }}
      />
      <div className="piano-container">
        <Piano />
      </div>
    </div>
  );
};

export default MainPage;
