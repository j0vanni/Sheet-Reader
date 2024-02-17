export enum Note {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
}

export interface PianoKey {
  note: Note[];
  sharp: boolean;
  flat: boolean;
  octave: number;
  global?: boolean;
}

export interface PianoProps {
  onKeyPress: (note: Note) => void;
  onResetPress: () => void;
}
