import { useState, useEffect } from "react";
import {
  compareNotes,
  generateBassNotation,
  generateNotes,
  generateTrebleNotation,
  notationToKey,
} from "../Utils/noteGenerationUtils";
import { PianoKey } from "../Utils/KeyTypes";

export const useMainPageState = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  //sheet music notations, we see both treble and bass displayed
  const [treble, setTreble] = useState(true); //on by default
  const [bass, setBass] = useState(true); //on by default
  //notation modifiers, if on will include sharps/flats randomly throughout
  const [sharps, setSharps] = useState(false);
  const [flats, setFlats] = useState(false);
  //user perferences
  const [seconds, setSeconds] = useState(30);
  const [tempo, setTempo] = useState(false);
  const [sameLine, setSameLine] = useState(false); //same line, use both sheets at the same time, meant for midi device use
  const [metronome, setMetronome] = useState(false); //will display a metronome with the desired BPM, to include sound later on
  const [beatspermin, setBPM] = useState(60);
  //starting test
  const [userStart, setUserStart] = useState(false); //starts when user touches a key
  const [currNote, setCurrNote] = useState(0); //the curr note index not including the breaks
  const [currNotePress, setCurrNotePress] = useState(0); //the curr note index not including the breaks and removing the breaks from the index count
  const [prevNotePress, setPrevNotePress] = useState<number | null>(null); //the time the user previously pressed the key, to help calculate the bpm
  const [intervals, setIntervals] = useState<number[]>([]); //the time intervals between notes, in an array to store for future reference
  const [isLastNoteCorrect, setIsLastNoteCorrect] = useState(false); //checks if the last press is correct, to be changed to an array for future storage
  const [noteCorrectTextOpactiy, setNoteCorrectTextOpactiy] = useState(0); //makes the text appear (100), then disappear (0)
  //notations start empty as they get randomly generated when site is loaded
  const [trebleNotation, setTrebleNotation] = useState(["!mark!C2"]);
  const [bassNotation, setBassNotation] = useState([""]);
  //note generation, to be seen what can be changed/adjusted
  const flatsharpPercentage = 0.2; //if flats/sharps are enabled, 20% will be flats/sharps
  const noteGenerationLength = 12; //length is 12 notes, good size normally
  const lineBreakLength = 4; //after 4 notes, a line break will be made
  const targetInterval = 60000 / beatspermin; //allows the intervals to compare with the bpm
  const bpmLeeway = 5; //the leeway given for the bpm. if you wanna be perfect, set to 0

  useEffect(() => {
    //if the notations are empty, generate new ones (when the site is first loaded)
    if (
      (trebleNotation.length === 0 && bassNotation.length === 0) ||
      (trebleNotation[0] === "" && bassNotation[0] === "")
    ) {
      updateNotations();
    }
    //if the last note is correct, show the correct text
    setNoteCorrectTextOpactiy(isLastNoteCorrect ? 1 : 0);

    //if the curr note is a line break, we move ahead/skip it
    if (trebleNotation[currNote] === "|" && bassNotation[currNote] === "|") {
      setCurrNote((prevNote) => prevNote + 1);
    }

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currNote, setNoteCorrectTextOpactiy, isLastNoteCorrect]);

  const generateNotationsForClef = (clef: string) => {
    return generateNotes(
      noteGenerationLength,
      sharps,
      flats,
      lineBreakLength,
      sameLine,
      flatsharpPercentage,
      clef
    );
  };

  const handleResetPress = () => {
    updateNotations();
  };

  const tempoCheck = () => {
    //get the current time to compare with the previous time
    const currentTime = Date.now();
    let currentBPM = 0;
    let interval = 0;

    //if we have a previous note, we will do this
    //will not be done on the first note press as we have nothing to compare to
    if (prevNotePress !== null) {
      //get the new interval between note presses
      interval = currentTime - prevNotePress;
      //add the interval to the array
      setIntervals([...intervals, interval]);
    }
    setPrevNotePress(currentTime);

    if (interval > 0) {
      //convert the interval ms to a BPM value
      currentBPM = 60000 / interval;
    }
    return currentBPM;
  };

  const updateNotations = () => {
    //we set everything to false/0 as this should be a new test
    setUserStart(false);
    let newTrebleNotation = trebleNotation;
    let newBassNotation = bassNotation;
    setCurrNote(0);
    setIntervals([]);
    setCurrNotePress(0);

    //generate both treble and bass with disregard for overlapping notes
    if (treble && bass && sameLine) {
      newTrebleNotation = generateTrebleNotation(
        noteGenerationLength,
        sharps,
        flats,
        lineBreakLength,
        flatsharpPercentage
      );
      newBassNotation = generateBassNotation(
        noteGenerationLength,
        sharps,
        flats,
        lineBreakLength,
        flatsharpPercentage
      );
      //generate treble and bass without overlapping notes
    } else if (treble && bass && !sameLine) {
      const notation = generateNotes(
        noteGenerationLength,
        sharps,
        flats,
        lineBreakLength,
        sameLine,
        flatsharpPercentage
      );
      newTrebleNotation = notation ? notation[0] : [];
      newBassNotation = notation ? notation[1] : [];
    }

    //just generate the treble notation
    if (treble && !bass) {
      const notations = generateNotationsForClef("treble");
      if (notations) {
        newTrebleNotation = notations[0];
        newBassNotation = notations[1];
      }
    }

    //just generate the bass notation
    if (!treble && bass) {
      const notations = generateNotationsForClef("bass");
      if (notations) {
        newTrebleNotation = notations[0];
        newBassNotation = notations[1];
      }
    }

    //set the new treble notation
    if (newTrebleNotation !== trebleNotation) {
      setTrebleNotation(newTrebleNotation);
    }
    //set the new bass notation
    if (newBassNotation !== bassNotation) {
      setBassNotation(newBassNotation);
    }
  };

  const handlePianoKeyPress = (note: PianoKey) => {
    //will start the 'test' when the user first presses on the keys
    if (!userStart) {
      setUserStart(true);
    }
    //gets the tempo between the current note and the last note
    const tempo = tempoCheck();
    //converts the notations (arrays) to Notes
    const currTreble = notationToKey(trebleNotation[currNote]);
    const currBass = notationToKey(bassNotation[currNote]);

    //compares the Notes to see if they are correct, returns true or false
    const isTrebleCorrect = compareNotes(currTreble, note);
    const isBassCorrect = compareNotes(currBass, note);

    //if either treble or bass is correct with the note pressed,
    //it will continue
    //needs to be adjusted for if the two handed option is on and
    //need to add if user wants to pause when wrong
    if (isTrebleCorrect || isBassCorrect) {
      //sets the last note to correct
      setIsLastNoteCorrect(true);
      //moves the curr note forward, this one is with line breaks included
      setCurrNote((prevNote) => prevNote + 1);
      //move the curr note press forward, without line breaks (important)
      setCurrNotePress((prevNotePress) => prevNotePress + 1);
    }
  };

  return {
    treble,
    setTreble,
    bass,
    setBass,
    sharps,
    setSharps,
    flats,
    setFlats,
    seconds,
    setSeconds,
    tempo,
    setTempo,
    sameLine,
    setSameLine,
    metronome,
    setMetronome,
    beatspermin,
    setBPM,
    currNote,
    trebleNotation,
    bassNotation,
    screenWidth,
    userStart,
    noteCorrectTextOpactiy,
    handlePianoKeyPress,
    handleResetPress,
  };
};
