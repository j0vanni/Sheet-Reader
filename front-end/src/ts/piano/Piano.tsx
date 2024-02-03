import React from "react";
import "./Piano.css";

const Piano: React.FC = () => {
  return (
    <div>
      <div className="piano">
        <button className="c-note"></button>
        <button className="cd-note"></button>
        <button className="d-note"></button>
        <button className="de-note"></button>
        <button className="e-note"></button>
        <button className="f-note"></button>
        <button className="fg-note"></button>
        <button className="g-note"></button>
        <button className="ga-note"></button>
        <button className="a-note"></button>
        <button className="ab-note"></button>
        <button className="b-note"></button>
      </div>
    </div>
  );
};

export default Piano;
