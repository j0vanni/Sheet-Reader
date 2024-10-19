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
    beatspermin: number;
    continueOnWrong: boolean;
    fullTrebleNotation: string[];
    fullBassNotation: string[];
    fullHightlightArray: string[];
    flatsharpPercentage: number;
    lineBreakLength: number;
    noteGenerationLength: number;
    bpmLeeway: number;
  } | null;
  onResetPress: () => void;
}
