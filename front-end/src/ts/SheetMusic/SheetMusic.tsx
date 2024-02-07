import React from "react";
import Notation from "../Notation/Notation";
import SheetTypes from "./SheetTypes";

interface SheetMusicProps {
  settings: SheetTypes.SheetSettings;
}

const SheetMusic: React.FC<SheetMusicProps> = ({ settings }) => {
  let notation = `K:${settings.scale} clef=${settings.clef}\n${settings.notation}`;

  return (
    <div>
      <Notation notation={notation} renderOptions={settings.renderOptions} />
    </div>
  );
};

export default SheetMusic;
