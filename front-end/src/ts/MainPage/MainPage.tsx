import React, { useEffect, useState } from "react";
import "./MainPage.css";
import SheetMusic from "../SheetMusic/SheetMusic";
import Piano from "../piano/Piano";
import Options from "../Options/Options";
import { Note } from "../piano/PianoTypes";
import { bassNoteUsage, trebleNoteUsage } from "../Utils/NoteUsage";
import {
  generateNotes,
  generateTrebleNotation,
  generateBassNotation,
} from "../Utils/noteGenerationUtils";

const MainPage: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [treble, setTreble] = useState(true);
  const [bass, setBass] = useState(true);
  const [sharps, setSharps] = useState(false);
  const [flats, setFlats] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [tempo, setTempo] = useState(false);
  const [twoHands, setTwoHands] = useState(false);
  const flatsharpPercentage = 0.2;
  const noteGenerationLength = 12;
  const lineBreakLength = 4;
  const [userStart, setUserStart] = useState(false);
  const [currNote, setCurrNote] = useState(0);

  const [trebleNotation, setTrebleNotation] = useState([""]);
  const [bassNotation, setBassNotation] = useState([""]);

  const handlePianoKeyPress = (note: Note) => {
    if (userStart === false) {
      setUserStart(true);
    }
  };

  const handleResetPress = () => {
    const notations = generateNotes(
      noteGenerationLength,
      sharps,
      flats,
      lineBreakLength,
      twoHands,
      flatsharpPercentage
    );
    if (notations) {
      setTrebleNotation(notations[0]);
      setBassNotation(notations[1]);
    }
  };

  useEffect(() => {
    if (treble && trebleNotation.length === 1 && twoHands) {
      setTrebleNotation(
        generateTrebleNotation(
          noteGenerationLength,
          sharps,
          flats,
          lineBreakLength,
          flatsharpPercentage
        )
      );
    }
    if (bass && bassNotation.length === 1 && twoHands) {
      setBassNotation(
        generateBassNotation(
          noteGenerationLength,
          sharps,
          flats,
          lineBreakLength,
          flatsharpPercentage
        )
      );
    }

    if (!twoHands && trebleNotation.length === 1 && bassNotation.length === 1) {
      const notations = generateNotes(
        noteGenerationLength,
        sharps,
        flats,
        lineBreakLength,
        twoHands,
        flatsharpPercentage
      );
      if (notations) {
        setTrebleNotation(notations[0]);
        setBassNotation(notations[1]);
      }
    }

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [trebleNotation, bassNotation, twoHands]);

  return (
    <div className="container">
      <div className="options-container">
        <Options
          treble={treble}
          setTreble={setTreble}
          bass={bass}
          setBass={setBass}
          sharps={sharps}
          setSharps={setSharps}
          flats={flats}
          setFlats={setFlats}
          seconds={seconds}
          setSeconds={setSeconds}
          tempo={tempo}
          setTempo={setTempo}
          twoHands={twoHands}
          setTwoHands={setTwoHands}
        />
      </div>
      <div className="sm-container">
        <SheetMusic
          settings={{
            timeSignature: "4/4",
            scale: "CMajor",
            clef: "treble",
            notation: trebleNotation,
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
            notation: bassNotation,
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
        <Piano
          onKeyPress={handlePianoKeyPress}
          onResetPress={handleResetPress}
        />
      </div>
    </div>
  );
};

export default MainPage;
