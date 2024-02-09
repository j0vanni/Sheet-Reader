import React, { useEffect, useState } from "react";
import "./MainPage.css";
import SheetMusic from "../SheetMusic/SheetMusic";
import Piano from "../Piano/Piano";
import Options from "../Options/Options";

const MainPage: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container">
      <div className="options-container">
        <Options />
      </div>
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
              staffwidth: screenWidth > 840 ? 800 : screenWidth - 100,
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
              staffwidth: screenWidth > 840 ? 800 : screenWidth - 100,
            },
          }}
        />
      </div>
      <div className="piano-container" tabIndex={1}>
        <Piano />
      </div>
    </div>
  );
};

export default MainPage;
