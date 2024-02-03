declare namespace SheetTypes {
  type Clef = "treble" | "bass" | "both";

  type Duration = "15" | "30" | "60";

  type TimeSignature = "4/4"; //more to be added later on

  interface SheetSettings {
    showFlats: boolean;
    showSharps: boolean;
    clef: Clef;
    duration: Duration;
    timeSignature: TimeSignature;
    userStart?: boolean;
  }
}
