export enum Note {
  C5 = "C5",
  D5 = "D5",
  E5 = "E5",
  F5 = "F5",
  G5 = "G5",
  A5 = "A5",
  B5 = "B5",
  CD5 = "CD5",
  DE5 = "DE5",
  FG5 = "FG5",
  GA5 = "GA5",
  AB5 = "AB5",
}

export interface PianoKey {
  note: Note;
  whiteKey?: boolean;
  blackKey?: boolean;
}

export interface PianoProps {
  onKeyPress: (note: Note) => void;
  onResetPress: () => void;
}
