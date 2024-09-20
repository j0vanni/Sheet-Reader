export interface TestCompleteProps {
  results: {
    treble: boolean;
    bass: boolean;
    sharp: boolean;
    flats: boolean;
    seconds: number;
    tempo: boolean;
    sameLine: boolean;
    bpms: number[];
    bpmTarget: number;
    continueOnWrong: boolean;
    fullTrebleNotation: string[];
    fullBassNotation: string[];
    fullHightlightArray: string[];
  } | null;
  onResetPress: () => void;
}
