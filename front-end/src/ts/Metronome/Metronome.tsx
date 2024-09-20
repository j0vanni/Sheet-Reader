import React, { useEffect, useState } from "react";
import "./Metronome.css";
import { MetronomeProps } from "../Utils/MetronomeUtils";

const Metronome: React.FC<MetronomeProps> = ({
  userStart,
  BPM,
  useMetronome,
}) => {
  const [pendulumRotation, setPendulumRotation] = useState(0);
  const [direction, setDirection] = useState(1);
  const targetInterval = 60000 / BPM / 2;

  useEffect(() => {
    if (userStart && useMetronome) {
      const interval = setInterval(() => {
        setPendulumRotation((prev) => {
          if (prev <= -75) {
            setDirection(1);
          } else if (prev >= 75) {
            setDirection(-1);
          }

          return prev + direction;
        });
      });
      return () => clearInterval(interval);
    } else {
      setPendulumRotation(0);
      setDirection(1);
    }
  }, [userStart, direction, targetInterval]);

  return (
    <div className="container">
      <div className="metronome_top"></div>
      <div className="metronome_frontbase">
        <div
          className="pendulum"
          style={{ transform: `rotateZ(${pendulumRotation}deg)` }}
        ></div>
      </div>
      <div className="metronome_backbase"></div>
      <div className="metronome_bottom"></div>
    </div>
  );
};

export default Metronome;
