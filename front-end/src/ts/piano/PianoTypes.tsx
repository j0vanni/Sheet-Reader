export enum Note {
  C4 = "C4",
  D4 = "D4",
  E4 = "E4",
  F4 = "F4",
  G4 = "G4",
  A4 = "A4",
  B4 = "B4",
  CD4 = "CD4",
  DE4 = "DE4",
  FG4 = "FG4",
  GA4 = "GA4",
  AB4 = "AB4",
}

export interface PianoKey {
  note: Note;
  whiteKey?: boolean;
  blackKey?: boolean;
}