import { trebleNoteUsage, bassNoteUsage } from "./NoteUsage";

export const generateNotes = (
  length: number,
  sharps: boolean,
  flats: boolean,
  linebreak: number,
  sameLine: boolean,
  percentage: number,
  specific?: string
) => {
  if (sameLine) {
    const trebleNotation = generateTrebleNotation(
      length,
      sharps,
      flats,
      linebreak,
      percentage
    );
    const bassNotation = generateBassNotation(
      length,
      sharps,
      flats,
      linebreak,
      percentage
    );

    return [trebleNotation, bassNotation];
  } else {
    const notation = twoHandedNotes(
      length,
      sharps,
      flats,
      linebreak,
      percentage,
      specific
    );
    if (notation) {
      //notation[0] = treble, notation[1] = bass
      return [notation[0], notation[1]];
    }
  }
};

export const generateTrebleNotation = (
  length: number,
  sharps: boolean,
  flats: boolean,
  linebreak: number,
  percentage: number
) => {
  let notation = [];
  for (let i = 0; i < length; i++) {
    if (i % linebreak === 0) {
      notation.push("|");
    }
    const randomNote = selectWeightedNote(trebleNoteUsage).note;
    notation.push(
      noteToNotation(randomNote, sharpsOrFlats(sharps, flats, percentage))
    );
  }
  return notation;
};

export const generateBassNotation = (
  length: number,
  sharps: boolean,
  flats: boolean,
  linebreak: number,
  percentage: number
) => {
  let notation: string[] = [];
  for (let i = 0; i < length; i++) {
    if (i % linebreak === 0) {
      notation.push("|");
    }
    const randomNote = selectWeightedNote(bassNoteUsage).note;

    notation.push(
      noteToNotation(randomNote, sharpsOrFlats(sharps, flats, percentage))
    );
  }
  return notation;
};

const twoHandedNotes = (
  length: number,
  sharps: boolean,
  flats: boolean,
  linebreak: number,
  percentage: number,
  specific?: string
) => {
  let arr = [];
  for (let i = 0; i < length; i++) {
    if (specific !== undefined) {
      arr.push(specific);
    } else {
      if (Math.random() < 0.5) {
        arr.push("treble");
      } else {
        arr.push("bass");
      }
    }
  }
  let trebleNotation = [];
  let bassNotation = [];

  for (let i = 0; i < length; i++) {
    if (i % linebreak === 0) {
      trebleNotation.push("|");
      bassNotation.push("|");
    }
    if (arr[i] === "treble") {
      const randomNote = selectWeightedNote(trebleNoteUsage).note;
      trebleNotation.push(
        noteToNotation(randomNote, sharpsOrFlats(sharps, flats, percentage))
      );
      bassNotation.push("x2");
    } else {
      const randomNote = selectWeightedNote(bassNoteUsage).note;
      bassNotation.push(
        noteToNotation(randomNote, sharpsOrFlats(sharps, flats, percentage))
      );
      trebleNotation.push("x2");
    }
  }

  return [trebleNotation, bassNotation];
};

const noteToNotation = (note: string, accidental: string) => {
  const baseNote = note.substring(0, 1);
  const octave = Number(note.substring(1));
  let newNote = `${accidental}${baseNote}`;

  if (octave < 4) {
    newNote += ",".repeat(4 - octave);
  } else if (octave > 4) {
    newNote += "'".repeat(octave - 4);
  }

  return newNote + "2";
};

const sharpsOrFlats = (sharps: boolean, flats: boolean, percentage: number) => {
  if (sharps && Math.random() < percentage) {
    return "^";
  } else if (flats && Math.random() < percentage) {
    return "_";
  }
  return "";
};

const selectWeightedNote = (noteUsageArray: Array<any>) => {
  const totalWeight = noteUsageArray.reduce(
    (acc, { percentage }) => acc + percentage,
    0
  );
  const randomNum = Math.random() * totalWeight;

  let weightSum = 0;
  for (const noteUsage of noteUsageArray) {
    weightSum += noteUsage.percentage;
    if (randomNum <= weightSum) {
      return noteUsage;
    }
  }
  return noteUsageArray[noteUsageArray.length - 1];
};
