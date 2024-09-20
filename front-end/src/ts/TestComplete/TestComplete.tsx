import React, { useEffect, useState } from "react";
import "./TestComplete.css";
import SheetMusic from "../SheetMusic/SheetMusic";
import { TestCompleteProps } from "../Utils/TestCompleteProps";

const TestComplete: React.FC<TestCompleteProps> = (props) => {
  const { results, onResetPress } = props;

  if (!results) {
    return <p>welp</p>;
  }

  const treble = results.treble;
  const bass = results.bass;
  const sharp = results.sharp;
  const flats = results.flats;
  const seconds = results.seconds;
  const tempo = results.tempo;
  const sameLine = results.sameLine;
  const bpms = results.bpms;
  const targetBPM = results.bpmTarget;
  const continueOnWrong = results.continueOnWrong;
  const avgBPM = results.bpms.slice(1).reduce((a, b) => (a + b) / 2, 0);
  const fullTrebleNotation = results.fullTrebleNotation;
  const fullBassNotation = results.fullBassNotation;
  const fullHighlightArray = results.fullHightlightArray;
  const correctNotes = fullHighlightArray.filter((x) => x === "green").length;
  console.log(fullHighlightArray, correctNotes);

  const newTempo = tempo ? "true" : "false";
  const newLine = sameLine ? "true" : "false";
  const newContinue = continueOnWrong ? "true" : "false";

  const [isRotated, setIsRotated] = useState(false);

  const handleReset = () => {
    setIsRotated(true);
    setTimeout(() => setIsRotated(false), 1000);
    onResetPress();
  };

  return (
    <div className="test-complete-container">
      <div className="tc-reset-button">
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
      <h2>Stats</h2>
      <hr />
      <div className="test-complete-data">
        <div className="treble-container">
          <SheetMusic
            settings={{
              notation: ["|"],
              clef: "treble",
              renderOptions: {
                paddingbottom: 0,
                paddingleft: 0,
                paddingright: 10,
                paddingtop: 0,
                staffwidth: 1,
                add_classes: true,
              },
            }}
          />
          {treble ? <p>enabled</p> : <p>disabled</p>}
          <p className="test-complete-text">
            {sharp ? <p>♭ enabled</p> : <p>♭ disabled</p>}
          </p>
        </div>
        <div className="bass-container">
          <SheetMusic
            settings={{
              notation: ["|"],
              clef: "bass",
              renderOptions: {
                paddingbottom: 0,
                paddingleft: 0,
                paddingright: 10,
                paddingtop: 0,
                staffwidth: 1,
                add_classes: true,
              },
            }}
          />
          {bass ? <p>enabled</p> : <p>disabled</p>}
          <p className="test-complete-text">
            {sharp ? <p>♯ enabled</p> : <p>♯ disabled</p>}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            height: 30,
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p style={{ fontWeight: "bold", lineHeight: 0 }}>time {seconds}s</p>
          <p style={{ fontWeight: "bold" }}>correct notes: {correctNotes}</p>
        </div>
        <div
          style={{
            display: "flex",
            height: 30,
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p style={{ fontWeight: "bold", lineHeight: 0 }}>
            {avgBPM.toFixed(0)} bpm on average
          </p>
          <p style={{ fontWeight: "bold" }}>wrong notes: {}</p>
        </div>
        <div style={{ height: 30 }}>
          {newContinue ? (
            <p style={{ fontWeight: "bold", lineHeight: 0 }}>
              continue on failure enabled
            </p>
          ) : (
            <p style={{ fontWeight: "bold", lineHeight: 0 }}>
              continue on failure disabled
            </p>
          )}
        </div>
        <div style={{ height: 30 }}>
          {sameLine && (
            <p style={{ fontWeight: "bold", lineHeight: 0 }}>
              two hands enabled
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestComplete;
