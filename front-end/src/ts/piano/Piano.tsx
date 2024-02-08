import React, { useState } from "react";
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
  const [isRotated, setIsRotated] = useState(false);
  const [rotDeg, setRotDeg] = useState(0);

  const handleReset = () => {
    setIsRotated(true);
    setTimeout(() => setIsRotated(false), 1000);
  };

  const whiteKeys = keys.map((key, index) =>
    key.whiteKey ? (
      <button
        key={index}
        className="white-key"
        onClick={() => console.log(key.note)}
        tabIndex={-1}
      ></button>
    ) : null
  );

  const blackKeys = keys.map((key, index) =>
    key.blackKey ? (
      <button
        key={index}
        className="black-key"
        onClick={() => console.log(key.note)}
        tabIndex={-1}
      ></button>
    ) : null
  );

  return (
    <div>
      <div className="reset-button">
        <button
          onClick={handleReset}
          style={
            isRotated
              ? {
                  transform: `rotate(${rotDeg + 360}deg)`,
                  transition: "all 1s ease",
                }
              : undefined
          }
          tabIndex={1}
        >
          <svg
            width="17"
            height="20"
            viewBox="0 0 17 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.9787 10.735C15.9894 10.9052 16 11.0754 16 11.2562C16 15.3945 12.6383 18.7562 8.5 18.7562C4.3617 18.7456 1 15.3945 1 11.2456C1 7.10731 4.3617 3.74561 8.5 3.74561C9.40426 3.74561 10.266 3.90518 11.0638 4.19241"
              stroke="white"
              stroke-width="1.68"
            />
            <path
              d="M8.34029 1L11.4148 4.07447L8.22327 7.2766"
              stroke="white"
              stroke-width="0.98"
            />
          </svg>
        </button>
      </div>
      <div className="piano-container">
        <div className="white-keys-container">{whiteKeys}</div>
        <div className="black-keys-container">{blackKeys}</div>
      </div>
    </div>
  );
};

export default Piano;
