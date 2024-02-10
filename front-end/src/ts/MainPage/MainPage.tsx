import React, { useEffect, useState } from "react";
import "./MainPage.css";
import SheetMusic from "../SheetMusic/SheetMusic";
import Piano from "../piano/Piano";
import Options from "../Options/Options";
import { Note } from "../piano/PianoTypes";
import { bassNoteUsage, trebleNoteUsage } from "./NoteUsage";

const MainPage: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [treble, setTreble] = useState(true);
  const [bass, setBass] = useState(true);
  const [sharps, setSharps] = useState(false);
  const [flats, setFlats] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [tempo, setTempo] = useState(false);
  const flatsharpPercentage = 0.2;
  const noteGenerationLength = 12;
  const lineBreakLength = 4;

  const [trebleNotation, setTrebleNotation] = useState(["c,2"]);
  const [bassNotation, setBassNotation] = useState(["c,,,2"]);

  const handlePianoKeyPress = (note: Note) => {
    console.log(note);
  };

  const handleResetPress = () => {
    generateTrebleNotation(noteGenerationLength, sharps, flats);
    generateBassNotation(noteGenerationLength, sharps, flats);
  };

  const noteToNotation = (note: string, sf: string) => {
    let newNote = "";
    if (sf !== "") {
      newNote = sf + note.substring(0, 1);
    } else {
      newNote = note.substring(0, 1);
    }
    const octave = Number(note.substring(1, 2));

    if (octave < 4) {
      newNote += ",".repeat(4 - octave);
    } else if (octave > 4) {
      newNote += "'".repeat(octave - 4);
    }
    newNote += "2";
    return newNote;
  };

  const sharpsOrFlats = (sharps: boolean, flats: boolean) => {
    let sf = "";
    if (sharps) {
      if (Math.random() < flatsharpPercentage) {
        sf += "^";
      }
    }
    if (flats && sf === "") {
      if (Math.random() < flatsharpPercentage) {
        sf += "_";
      }
    }

    return sf;
  };

  const selectWeightedNote = (noteUsageArray: Array<any>) => {
    const totalWeight = noteUsageArray.reduce(
      (acc, { percentage }) => acc + percentage,
      0
    );
    const randomNum = Math.random() * totalWeight;

    let weightSum = 0;
    for (const noteUsage of noteUsageArray) {
      weightSum += noteUsage.percentage;
      if (randomNum <= weightSum) {
        return noteUsage;
      }
    }
    return noteUsageArray[noteUsageArray.length - 1];
  };

  const generateTrebleNotation = (
    length: number,
    sharps: boolean,
    flats: boolean
  ) => {
    let notation = [];
    for (let i = 0; i < length; i++) {
      if (i % lineBreakLength === 0) {
        notation.push("|");
      }
      const randomNote = selectWeightedNote(trebleNoteUsage).note;
      notation.push(noteToNotation(randomNote, sharpsOrFlats(sharps, flats)));
    }
    setTrebleNotation(notation);
  };

  const generateBassNotation = (
    length: number,
    sharps: boolean,
    flats: boolean
  ) => {
    let notation = [];
    for (let i = 0; i < length; i++) {
      if (i % lineBreakLength === 0) {
        notation.push("|");
      }
      const randomNote = selectWeightedNote(bassNoteUsage).note;

      notation.push(noteToNotation(randomNote, sharpsOrFlats(sharps, flats)));
    }
    console.log(notation);
    setBassNotation(notation);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [trebleNotation, bassNotation]);

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
