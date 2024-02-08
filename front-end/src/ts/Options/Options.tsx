import React from "react";
import "./Options.css";

const Options: React.FC = () => {
  const [treble, setTreble] = React.useState(true);
  const [bass, setBass] = React.useState(true);
  const [sharps, setSharps] = React.useState(false);
  const [flats, setFlats] = React.useState(false);
  const [seconds, setSeconds] = React.useState(30);
  const [tempo, setTempo] = React.useState(false);

  return (
    <div className="op-container" tabIndex={-1}>
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
      <p id="divide"></p>
      <button onClick={() => setSeconds(15)} tabIndex={-1}>
        <p className={seconds === 15 ? "selected" : "unselected"}>15 seconds</p>
      </button>
      <button onClick={() => setSeconds(30)} tabIndex={-1}>
        <p className={seconds === 30 ? "selected" : "unselected"}>30 seconds</p>
      </button>
      <button onClick={() => setSeconds(60)} tabIndex={-1}>
        <p className={seconds === 60 ? "selected" : "unselected"}>60 seconds</p>
      </button>
      <p id="divide"></p>
      <button onClick={() => setTempo(!tempo)} tabIndex={-1}>
        <p className={tempo ? "selected" : "unselected"}>Match Tempo</p>
      </button>
    </div>
  );
};

export default Options;
