import React, { useEffect, useState } from "react";
import Options from "../Options/Options";
import Piano from "../Piano/Piano";
import SheetMusic from "../SheetMusic/SheetMusic";
import { useMainPageState } from "../Utils/MainPageUtils";
import "./MainPage.css";
import Metronome from "../Metronome/Metronome";
import TestComplete from "../TestComplete/TestComplete";

const MainPage: React.FC = () => {
  const {
    treble,
    setTreble,
    bass,
    setBass,
    sharp,
    setSharp,
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
    handleResetPress,
    testComplete,
    intervals,
    continueOnWrong,
    setFinalResults,
    finalResults,
    setSecondsTimer,
    secondsTimer,
    correctNotes,
    wrongNotes,
    sheetScale,
    setContinueOnWrong,
  } = useMainPageState();

  return (
    <div className="container">
      <div className="options-container">
        <Options
          treble={treble}
          setTreble={setTreble}
          bass={bass}
          setBass={setBass}
          sharps={sharp}
          setSharps={setSharp}
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
          continueOnWrong={continueOnWrong}
          setContinueOnWrong={setContinueOnWrong}
        />
      </div>

      <div className="sm-container">
        <p className="seconds-timer-mainpage">{secondsTimer}</p>
        <SheetMusic
          settings={{
            currentNote: currNote,
            timeSignature: "4/4",
            scale: "CMajor",
            clef: "treble",
            notation: trebleNotation,
            renderOptions: {
              add_classes: true,
              scale: sheetScale,
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
              add_classes: true,
              scale: sheetScale,
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
        {metronome && (
          <div className="metronome-container">
            <Metronome
              userStart={userStart}
              BPM={beatspermin}
              useMetronome={metronome}
            />
          </div>
        )}
        {testComplete ? (
          <TestComplete
            results={finalResults}
            onResetPress={handleResetPress}
          />
        ) : (
          <Piano
            onKeyPress={handlePianoKeyPress}
            onResetPress={handleResetPress}
          />
        )}
      </div>
    </div>
  );
};

export default MainPage;
