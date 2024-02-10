import React from "react";
import Notation from "../Notation/Notation";
import SheetTypes from "./SheetTypes";

interface SheetMusicProps {
  settings: SheetTypes.SheetSettings;
}

const SheetMusic: React.FC<SheetMusicProps> = ({ settings }) => {
  let notationtoString = settings.notation.join("");
  let notation = `K:${settings.scale} clef=${settings.clef}\n${notationtoString}`;

  return (
    <div>
      <Notation notation={notation} renderOptions={settings.renderOptions} />
    </div>
  );
};

export default SheetMusic;
