import React from "react";
import "./Piano.css";
import { PianoKey, Note } from "./PianoTypes";

const keys: PianoKey[] = [
  { note: Note.C4, whiteKey: true },
  { note: Note.CD4, blackKey: true },
  { note: Note.D4, whiteKey: true },
  { note: Note.DE4, blackKey: true },
  { note: Note.E4, whiteKey: true },
  { note: Note.F4, whiteKey: true },
  { note: Note.FG4, blackKey: true },
  { note: Note.G4, whiteKey: true },
  { note: Note.GA4, blackKey: true },
  { note: Note.A4, whiteKey: true },
  { note: Note.AB4, blackKey: true },
  { note: Note.B4, whiteKey: true },
];

const Piano: React.FC = () => {
  const whiteKeys = keys.map((key, index) =>
    key.whiteKey ? (
      <button
        key={index}
        className="white-key"
        onClick={() => console.log(key.note)}
      ></button>
    ) : null
  );

  const blackKeys = keys.map((key, index) =>
    key.blackKey ? (
      <button
        key={index}
        className="black-key"
        onClick={() => console.log(key.note)}
      ></button>
    ) : null
  );

  return (
    <div className="piano-container">
      <div className="white-keys-container">{whiteKeys}</div>
      <div className="black-keys-container">{blackKeys}</div>
    </div>
  );
};

export default Piano;
