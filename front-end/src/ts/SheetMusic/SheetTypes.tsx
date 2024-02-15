import { RenderOptions } from "../Notation/NotationTypes";

declare namespace SheetTypes {
  enum Scale {
    CMajor = "C\n",
    GMajor = "G\n",
    DMajor = "D\n",
    AMajor = "A\n",
    EMajor = "E\n",
    BMajor = "B\n",
    FSharpMajor = "F#\n",
    CSharpMajor = "C#\n",
    FMajor = "F\n",
    BFlatMajor = "Bb\n",
    EFlatMajor = "Eb\n",
    AFlatMajor = "Ab\n",
    AMinor = "Am\n",
    EMinor = "Em\n",
    BMinor = "Bm\n",
    FSharpMinor = "F#m\n",
    CSharpMinor = "C#m\n",
    GSharpMinor = "G#m\n",
    DSharpMinor = "D#m\n",
    ASharpMinor = "A#m\n",
    DMinor = "Dm\n",
    GMinor = "Gm\n",
    CMinor = "Cm\n",
    FMinor = "Fm\n",
  }

  type Clef = "treble" | "bass";

  type TimeSignature = "4/4"; //more to be added later

  type ScaleType = keyof typeof Scale;

  interface SheetSettings {
    clef: Clef;
    scale: ScaleType;
    timeSignature: TimeSignature;
    notation: string[];
    renderOptions?: RenderOptions;
    currentNote: number;
  }
}

export default SheetTypes;
