declare namespace SheetTypes {
  type Clef = "treble" | "bass" | "both";

  type TimeSignature = "4/4"; //more to be added later on

  interface SheetSettings {
    showFlats: boolean;
    showSharps: boolean;
    clef: Clef;
    timeSignature: TimeSignature;
    userStart?: boolean;
  }
}
