import React from "react";
import "./Options.css";

type OptionsProps = {
  treble: boolean;
  setTreble: (value: boolean) => void;
  bass: boolean;
  setBass: (value: boolean) => void;
  sharps: boolean;
  setSharps: (value: boolean) => void;
  flats: boolean;
  setFlats: (value: boolean) => void;
  seconds: number;
  setSeconds: (value: number) => void;
  tempo: boolean;
  setTempo: (value: boolean) => void;
};

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
}) => {
  return (
    <div className="op-container" tabIndex={-1}>
      <div>
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
      <div>
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
      <div>
        <button onClick={() => setTempo(!tempo)} tabIndex={-1}>
          <p className={tempo ? "selected" : "unselected"}>Match Tempo</p>
        </button>
      </div>
    </div>
  );
};

export default Options;
