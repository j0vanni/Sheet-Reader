declare namespace PianoTypes {
  enum Note {
    C = "C",
    D = "D",
    E = "E",
    F = "F",
    G = "G",
    A = "A",
    B = "B",
    CSharp = "C#",
    DSharp = "D#",
    FSharp = "F#",
    GSharp = "G#",
    ASharp = "A#",
    DFlat = "Db",
    EFlat = "Eb",
    GFlat = "Gb",
    AFlat = "Ab",
    BFlat = "Bb",
  }

  interface PianoKey {
    note: Note;
    isFlat?: boolean;
    isSharp?: boolean;
  }

  type Clef = "treble" | "bass" | "both";

  type Duration = "15" | "30" | "60";

  type TimeSignature = "4/4"; //more to be added later on

  interface PianoSettings {
    showFlats: boolean;
    showSharps: boolean;
    clef: Clef;
    duration: Duration;
    timeSignature: TimeSignature;
  }
}
