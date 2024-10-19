import { Note, PianoKey } from "./KeyTypes";
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

export const notationToKey = (note: string): PianoKey | null => {
  if (note !== "|" && note !== "x2") {
    const matchNote = note.match(/[a-gA-G]/g);
    const sharp = note.includes("^");
    const flat = note.includes("_");
    const octave = Number(note.substring(note.length - 1));

    if (matchNote) {
      const note = matchNote[0];
      let key: PianoKey = {
        note: [note as Note],
        sharp: sharp,
        flat: flat,
        octave: octave,
      };
      return key;
    }
  } else {
    return null;
  }
  return null;
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

export const compareNotes = (
  note1: PianoKey | null,
  note2: PianoKey | null
): boolean => {
  //return false if either note is null, notes do not align with sharp/flat
  if (
    note1 === null ||
    note2 === null ||
    note1.sharp !== note2.sharp ||
    note1.flat !== note2.flat
  ) {
    console.log(note1, note2)
    console.log(note1?.sharp, note2?.sharp)
    console.log(note1?.flat, note2?.flat)
    
    return false;
  }

  //function to compare note arrays
  const compareNoteArrays = (arr: Note[], arr2: Note[]) => {
    if (arr.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  };

  //if either note is global, compare note arrays
  if (note1.global || note2.global) {
    return compareNoteArrays(note1.note, note2.note);
  }

  //otherwise, check if the octaves match
  if (note1.octave !== note2.octave) {
    return false;
  }

  //if the octaves match, compare note arrays
  return compareNoteArrays(note1.note, note2.note);
};
