import React from "react";
import "./Options.css";
import { OptionsProps } from "../Utils/OptionsUtils";

const Options: React.FC<OptionsProps> = ({
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
  continueOnWrong,
  setContinueOnWrong,
}) => {
  return (
    <div className="op-container" tabIndex={-1}>
      <div className="note-options-container">
        <button onClick={() => setTreble(!treble)} tabIndex={-1}>
          <p className={treble ? "selected" : "unselected"}>Treble</p>
        </button>
        <button onClick={() => setBass(!bass)} tabIndex={-1}>
          <p className={bass ? "selected" : "unselected"}>Bass</p>
        </button>
        <button onClick={() => setSharps(!sharps)} tabIndex={-1}>
          <p className={sharps ? "selected" : "unselected"}>Sharps</p>
        </button>
        <button onClick={() => setFlats(!flats)} tabIndex={-1}>
          <p className={flats ? "selected" : "unselected"}>Flats</p>
        </button>
      </div>
      <p id="divide"></p>
      <div className="seconds-options-container">
        <button onClick={() => setSeconds(15)} tabIndex={-1}>
          <p className={seconds === 15 ? "selected" : "unselected"}>
            15 seconds
          </p>
        </button>
        <button onClick={() => setSeconds(30)} tabIndex={-1}>
          <p className={seconds === 30 ? "selected" : "unselected"}>
            30 seconds
          </p>
        </button>
        <button onClick={() => setSeconds(60)} tabIndex={-1}>
          <p className={seconds === 60 ? "selected" : "unselected"}>
            60 seconds
          </p>
        </button>
      </div>
      <p id="divide"></p>
      <div className="extra-options-container">
        {/* to be implemented with midi buttons later
         <button
          onClick={() => {
            setSameLine(!sameLine);
            if (sameLine === false) {
              setBass(true);
              setTreble(true);
            }
          }}
          tabIndex={-1}
        >
          <p className={sameLine ? "selected" : "unselected"}>Two Hands</p>
        </button> */}
        <button
          onClick={() => setContinueOnWrong(!continueOnWrong)}
          tabIndex={-1}
        >
          <p className={continueOnWrong ? "selected" : "unselected"}>
            Cont. on Fail
          </p>
        </button>
        <button onClick={() => setTempo(!tempo)} tabIndex={-1}>
          <p className={tempo ? "selected" : "unselected"}>Match Tempo</p>
        </button>

        {tempo && (

        <div className="bpm-container">
          <label htmlFor="bpm-input">BPM:</label>
          <input
            type="number"
            id="bpm-input"
            value={beatspermin}
            onChange={(e) => setBPM(Number(e.target.value))}
            min="40"
            max="240"
            tabIndex={-1}
          />
        </div>)}
        
        {/*add this later, should work with sound and better positioning
        <button onClick={() => setMetronome(!metronome)} tabIndex={-1}>
          <p className={metronome ? "selected" : "unselected"}>Use Metronome</p>
        </button> */}
      </div>
    </div>
  );
};

export default Options;
