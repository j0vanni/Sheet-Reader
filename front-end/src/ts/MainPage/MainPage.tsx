import React, { useEffect, useState } from "react";
import Options from "../Options/Options";
import Piano from "../Piano/Piano";
import SheetMusic from "../SheetMusic/SheetMusic";
import { useMainPageState } from "./MainPageUtils";
import "./MainPage.css";
import Metronome from "../Metronome/Metronome";

const MainPage: React.FC = () => {

  const {
    treble,
    setTreble,
    bass,
    setBass,
    sharps,
    setSharps,
    flats,
    setFlats,
    seconds,
    setSeconds,
    tempo,
    setTempo,
    sameLine,
    setSameLine,
    metronome,
    setMetronome,
    beatspermin,
    setBPM,
    currNote,
    trebleNotation,
    bassNotation,
    screenWidth,
    userStart,
    noteCorrectTextOpactiy,
    handlePianoKeyPress,
    handleResetPress
  } = useMainPageState();
  
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
          metronome={metronome}
          setMetronome={setMetronome}
          beatspermin={beatspermin}
          setBPM={setBPM}
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
      
      <div
        className="note-correct-text"
        style={{ opacity: noteCorrectTextOpactiy }}
      >
        test
      </div>
      <div className="piano-container" tabIndex={1}>
        {metronome && (
        <div className="metronome-container">
          <Metronome
            userStart={userStart}
            BPM={beatspermin}
            useMetronome={metronome}
          />
        </div>
      )}
        <Piano
          onKeyPress={handlePianoKeyPress}
          onResetPress={handleResetPress}
        />
      </div>
    </div>
  );
};

export default MainPage;
