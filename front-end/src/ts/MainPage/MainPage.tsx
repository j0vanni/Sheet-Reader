import React, { useEffect, useState } from "react";
import Options from "../Options/Options";
import SheetMusic from "../SheetMusic/SheetMusic";
import { Note, PianoKey } from "../Utils/KeyTypes";
import {
  compareNotes,
  generateBassNotation,
  generateNotes,
  generateTrebleNotation,
  notationToKey,
} from "../Utils/noteGenerationUtils";
import Piano from "../piano/Piano";
import "./MainPage.css";

const MainPage: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [treble, setTreble] = useState(true);
  const [bass, setBass] = useState(true);
  const [sharps, setSharps] = useState(false);
  const [flats, setFlats] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [tempo, setTempo] = useState(false);
  const [sameLine, setSameLine] = useState(false);
  const flatsharpPercentage = 0.2;
  const noteGenerationLength = 12;
  const lineBreakLength = 4;
  const [userStart, setUserStart] = useState(false);
  const [currNote, setCurrNote] = useState(1);

  const [trebleNotation, setTrebleNotation] = useState([""]);
  const [bassNotation, setBassNotation] = useState([""]);

  const [prevNotePress, setPrevNotePress] = useState<number | null>(null);
  const [intervals, setIntervals] = useState<number[]>([]);

  const generateNotationsForClef = (clef: string) => {
    return generateNotes(
      noteGenerationLength,
      sharps,
      flats,
      lineBreakLength,
      sameLine,
      flatsharpPercentage,
      clef
    );
  };

  const updateNotations = () => {
    setUserStart(false);
    let newTrebleNotation = trebleNotation;
    let newBassNotation = bassNotation;
    setCurrNote(0);

    if (treble && bass && sameLine) {
      newTrebleNotation = generateTrebleNotation(
        noteGenerationLength,
        sharps,
        flats,
        lineBreakLength,
        flatsharpPercentage
      );
      newBassNotation = generateBassNotation(
        noteGenerationLength,
        sharps,
        flats,
        lineBreakLength,
        flatsharpPercentage
      );
    }

    if (treble && bass && !sameLine) {
      const notation = generateNotes(
        noteGenerationLength,
        sharps,
        flats,
        lineBreakLength,
        sameLine,
        flatsharpPercentage
      );
      newTrebleNotation = notation ? notation[0] : [];
      newBassNotation = notation ? notation[1] : [];
    }

    if (treble && !bass) {
      const notations = generateNotationsForClef("treble");
      if (notations) {
        newTrebleNotation = notations[0];
        newBassNotation = notations[1];
      }
    }

    if (!treble && bass) {
      const notations = generateNotationsForClef("bass");
      if (notations) {
        newTrebleNotation = notations[0];
        newBassNotation = notations[1];
      }
    }

    if (newTrebleNotation !== trebleNotation) {
      setTrebleNotation(newTrebleNotation);
    }
    if (newBassNotation !== bassNotation) {
      setBassNotation(newBassNotation);
    }
  };

  const handlePianoKeyPress = (note: PianoKey) => {
    if (!userStart) {
      setUserStart(true);
    }
    tempoCheck();
    const currTreble = notationToKey(trebleNotation[currNote]);
    const currBass = notationToKey(bassNotation[currNote]);

    const isTrebleCorrect = compareNotes(currTreble, note);
    const isBassCorrect = compareNotes(currBass, note);

    if (sameLine) {
      if (isTrebleCorrect || isBassCorrect) {
        setCurrNote((prevNote) => prevNote + 1);
      }
    } else {
      if (isTrebleCorrect && isBassCorrect) {
        setCurrNote((prevNote) => prevNote + 1);
      }
    }
  };

  const handleResetPress = () => {
    updateNotations();
  };

  const tempoCheck = () => {
    const currentTime = Date.now();
    if (prevNotePress !== null) {
      const interval = currentTime - prevNotePress;
      setIntervals([...intervals, interval]);
    }
    setPrevNotePress(currentTime);
  };

  useEffect(() => {
    if (trebleNotation.length === 0 || bassNotation.length === 0) {
      updateNotations();
    }

    if (trebleNotation[currNote] === "|" && bassNotation[currNote] === "|") {
      setCurrNote((prevNote) => prevNote + 1);
    }

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currNote]);

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
          sameLine={sameLine}
          setSameLine={setSameLine}
        />
      </div>
      <div className="sm-container">
        <SheetMusic
          settings={{
            currentNote: currNote,
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
              selectTypes: [],
            },
          }}
        />
        <SheetMusic
          settings={{
            currentNote: currNote,
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
              selectTypes: [],
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
