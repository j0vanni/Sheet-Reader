import React, { useState } from "react";
import "./Piano.css";
import { PianoKey, Note, PianoProps } from "./PianoTypes";

const keys: PianoKey[] = [
  { note: Note.C5, whiteKey: true },
  { note: Note.CD5, blackKey: true },
  { note: Note.D5, whiteKey: true },
  { note: Note.DE5, blackKey: true },
  { note: Note.E5, whiteKey: true },
  { note: Note.F5, whiteKey: true },
  { note: Note.FG5, blackKey: true },
  { note: Note.G5, whiteKey: true },
  { note: Note.GA5, blackKey: true },
  { note: Note.A5, whiteKey: true },
  { note: Note.AB5, blackKey: true },
  { note: Note.B5, whiteKey: true },
];

const Piano: React.FC<PianoProps> = ({ onKeyPress, onResetPress }) => {
  const [isRotated, setIsRotated] = useState(false);

  const handleReset = () => {
    setIsRotated(true);
    setTimeout(() => setIsRotated(false), 1000);
    onResetPress();
  };

  const handleKeyPress = (note: Note) => {
    onKeyPress(note);
  };

  const whiteKeys = keys.map((key, index) =>
    key.whiteKey ? (
      <button
        key={index}
        className="white-key"
        onClick={() => handleKeyPress(key.note)}
        tabIndex={-1}
      ></button>
    ) : null
  );

  const blackKeys = keys.map((key, index) =>
    key.blackKey ? (
      <button
        key={index}
        className="black-key"
        onClick={() => handleKeyPress(key.note)}
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
                  transform: `rotate(${360}deg)`,
                  transition: "all .5s ease",
                }
              : {
                  transform: `rotate(${0}deg)`,
                }
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
              strokeWidth="1.68"
            />
            <path
              d="M8.34029 1L11.4148 4.07447L8.22327 7.2766"
              stroke="white"
              strokeWidth="0.98"
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
