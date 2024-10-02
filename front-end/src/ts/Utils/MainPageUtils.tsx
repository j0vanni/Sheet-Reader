import { useState, useEffect, useRef } from "react";
import {
  compareNotes,
  generateBassNotation,
  generateNotes,
  generateTrebleNotation,
  notationToKey,
} from "../Utils/noteGenerationUtils";
import { Note, PianoKey } from "../Utils/KeyTypes";

export const useMainPageState = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  //sheet music notations, we see both treble and bass displayed
  const [treble, setTreble] = useState(true); //on by default
  const [bass, setBass] = useState(true); //on by default
  //notation modifiers, if on will include sharps/flats randomly throughout
  const [sharp, setSharp] = useState(false);
  const [flats, setFlats] = useState(false);
  //user perferences
  const [seconds, setSeconds] = useState(30);
  const [secondsTimer, setSecondsTimer] = useState(seconds);
  const [tempo, setTempo] = useState(false);
  const [sameLine, setSameLine] = useState(false); //same line, use both sheets at the same time, meant for midi device use
  const [metronome, setMetronome] = useState(false); //will display a metronome with the desired BPM, to include sound later on
  const [beatspermin, setBPM] = useState(60);
  const [continueOnWrong, setContinueOnWrong] = useState(true); //if the user wants to continue on wrong notes
  //starting test / data for final
  const [userStart, setUserStart] = useState(false); //starts when user touches a key
  const [currNote, setCurrNote] = useState(0); //the curr note index not including the breaks
  const [currNotePress, setCurrNotePress] = useState(0); //the curr note index not including the breaks and removing the breaks from the index count
  const [prevNotePress, setPrevNotePress] = useState<number | null>(null); //the time the user previously pressed the key, to help calculate the bpm
  const [intervals, setIntervals] = useState<number[]>([]); //the time intervals between notes, in an array to store for future reference
  const [bpms, setBPMS] = useState<number[]>([]);
  const [isLastNoteCorrect, setIsLastNoteCorrect] = useState(false); //checks if the last press is correct, to be changed to an array for future storage
  const [noteCorrectTextOpactiy, setNoteCorrectTextOpactiy] = useState(0); //makes the text appear (100), then disappear (0)
  const [testComplete, setTestComplete] = useState(false);
  const [sheetScale, setSheetScale] = useState(1.5);
  const [finalResults, setFinalResults] = useState<{
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
  } | null>(null);
  const [time, setTime] = useState(0);
  const [correctNotes, setCorrectNotes] = useState<number>(0);
  const [wrongNotes, setWrongNotes] = useState<number>(0);
  const [fullTrebleNotation, setFullTrebleNotation] = useState<string[]>([]);
  const [fullBassNotation, setFullBassNotation] = useState<string[]>([]);
  const [fullHightlightArray, setFullHighlightArray] = useState<string[]>([]);
  //notations start empty as they get randomly generated when site is loaded
  const [trebleNotation, setTrebleNotation] = useState([""]);
  const [bassNotation, setBassNotation] = useState([""]);
  const [highlightArray, setHighlightArray] = useState<string[]>(["white"]);
  //note generation, to be seen what can be changed/adjusted
  const flatsharpPercentage = 0.2; //if flats/sharps are enabled, 20% will be flats/sharps
  const lineBreakLength = 4; //after 4 notes, a line break will be made
  const noteGenerationLength = 4 * lineBreakLength; //length is 12 notes, good size normally
  const targetInterval = 60000 / beatspermin; //allows the intervals to compare with the bpm
  const bpmLeeway = 5; //the leeway given for the bpm. if you wanna be perfect, set to 0

  const previousHighlightRef = useRef<{
    noteIndex: number;
    measureIndex: number;
  } | null>(null);

  useEffect(() => {
    //if the notations are empty, generate new ones (when the site is first loaded)
    if (
      (trebleNotation.length === 0 && bassNotation.length === 0) ||
      (trebleNotation[0] === "" && bassNotation[0] === "")
    ) {
      resetTest();
      updateNotations();
      clearHighlightStyles();
    }

    if (currNote === trebleNotation.length - lineBreakLength) {
      const endTreble = trebleNotation.slice(
        trebleNotation.length - (lineBreakLength + 1),
        trebleNotation.length
      );
      const endBass = bassNotation.slice(
        bassNotation.length - (lineBreakLength + 1),
        bassNotation.length
      );
      // console.log(endTreble, endBass);

      setFullTrebleNotation((prev) => [
        ...prev,
        ...trebleNotation.slice(
          0,
          trebleNotation.length - (lineBreakLength + 1)
        ),
      ]);
      setFullBassNotation((prev) => [
        ...prev,
        ...bassNotation.slice(0, bassNotation.length - (lineBreakLength + 1)),
      ]);

      setFullHighlightArray((prev) => [
        ...prev,
        ...highlightArray.slice(0, -1),
      ]);

      setCurrNote(0);
      setCurrNotePress(0);

      const initialHighlightArray = Array(highlightArray.length).fill("gray");

      setHighlightArray(initialHighlightArray);

      updateHighlight(highlightArray, lineBreakLength);

      updateNotations();

      const modifiedNewTreble = endTreble.concat(
        trebleNotation.slice(0, trebleNotation.length - endTreble.length)
      );
      const modifiedNewBass = endBass.concat(
        bassNotation.slice(0, bassNotation.length - endBass.length)
      );

      setTrebleNotation(modifiedNewTreble);
      setBassNotation(modifiedNewBass);
    }

    //if the curr note is a line break, we move ahead/skip it
    if (trebleNotation[currNote] === "|" && bassNotation[currNote] === "|") {
      setCurrNote((prevNote) => prevNote + 1);
    }

    if (!userStart && seconds != secondsTimer) {
      setSecondsTimer(seconds);
    }

    updateHighlight(highlightArray, lineBreakLength);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [
    currNote,
    setNoteCorrectTextOpactiy,
    isLastNoteCorrect,
    trebleNotation,
    bassNotation,
    seconds,
  ]);

  //timer for the test, will count down from the seconds given, will stop when the seconds reach 0
  useEffect(() => {
    if (userStart) {
      const intervalId = setInterval(() => {
        setSecondsTimer((prev) => {
          if (prev > 0) {
            return prev - 1;
          }
          return 0;
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [userStart]);

  useEffect(() => {
    if (secondsTimer === 0 && userStart) {
      const updatedFullTrebleNotation = [
        ...fullTrebleNotation,
        ...trebleNotation,
      ];
      const updatedFullBassNotation = [...fullBassNotation, ...bassNotation];
      const updatedFullHighlightArray = [
        ...fullHightlightArray,
        ...highlightArray,
      ];

      setFullTrebleNotation(updatedFullTrebleNotation);
      setFullBassNotation(updatedFullBassNotation);
      setFullHighlightArray(updatedFullHighlightArray);

      setFinalResults({
        treble,
        bass,
        sharp,
        flats,
        seconds,
        tempo,
        sameLine,
        bpms,
        beatspermin,
        continueOnWrong,
        fullTrebleNotation: updatedFullTrebleNotation,
        fullBassNotation: updatedFullBassNotation,
        fullHightlightArray: updatedFullHighlightArray,
      });

      setTestComplete(true);
      setSheetScale(0.8);
    }
  }, [secondsTimer]);

  const generateNotationsForClef = (clef: string) => {
    return generateNotes(
      noteGenerationLength,
      sharp,
      flats,
      lineBreakLength,
      sameLine,
      flatsharpPercentage,
      clef
    );
  };

  const handleResetPress = () => {
    resetTest();
    updateNotations();
    clearHighlightStyles();
  };

  //needs to be fixed
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

    setBPMS([...bpms, currentBPM]);
  };

  const resetTest = () => {
    //we set everything to false/0 as this should be a new test
    setUserStart(false);
    setTestComplete(false);
    setCurrNote(0);
    setIntervals([]);
    setCurrNotePress(0);
    setSecondsTimer(seconds);
    setFinalResults(null);
    setSheetScale(1.5);
    setCorrectNotes(0);
    setWrongNotes(0);
    setHighlightArray(["white"]);
    updateHighlight(highlightArray, lineBreakLength);
    setFullTrebleNotation([]);
    setFullBassNotation([]);
    setFullHighlightArray([]);
    setBPMS([]);
  };

  const updateNotations = () => {
    let newTrebleNotation = trebleNotation;
    let newBassNotation = bassNotation;

    //generate both treble and bass with disregard for overlapping notes
    if (treble && bass && sameLine) {
      newTrebleNotation = generateTrebleNotation(
        noteGenerationLength,
        sharp,
        flats,
        lineBreakLength,
        flatsharpPercentage
      );
      newBassNotation = generateBassNotation(
        noteGenerationLength,
        sharp,
        flats,
        lineBreakLength,
        flatsharpPercentage
      );
      //generate treble and bass without overlapping notes
    } else if (treble && bass && !sameLine) {
      const notation = generateNotes(
        noteGenerationLength,
        sharp,
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
    tempoCheck();

    //converts the notations (arrays) to Notes
    const currTreble = notationToKey(trebleNotation[currNote]);
    const currBass = notationToKey(bassNotation[currNote]);

    //compares the Notes to see if they are correct, returns true or false
    const isTrebleCorrect = compareNotes(currTreble, note);
    const isBassCorrect = compareNotes(currBass, note);

    const newHighlightArray = [...highlightArray];

    //if either treble or bass is correct with the note pressed,
    //it will continue
    //needs to be adjusted for if the two handed option is on and
    //need to add if user wants to pause when wrong
    if (
      (!sameLine && (isTrebleCorrect || isBassCorrect)) ||
      (sameLine && isTrebleCorrect && isBassCorrect)
    ) {
      //sets the last note to correct
      setIsLastNoteCorrect(true);
      newHighlightArray[currNotePress + 1] = "white";

      if (
        tempo &&
        bpms.length > 1 &&
        Math.abs(Number(bpms[bpms.length - 1] - beatspermin)) > bpmLeeway
      ) {
        newHighlightArray[currNotePress] = "yellow";
      } else {
        newHighlightArray[currNotePress] = "green";
      }
      //moves the curr note forward, this one is with line breaks included
      setCurrNote((prevNote) => prevNote + 1);
      //move the curr note press forward, without line breaks (important)
      setCurrNotePress((prevNotePress) => prevNotePress + 1);
    } else {
      setIsLastNoteCorrect(false);
      newHighlightArray[currNotePress + 1] = "white";
      newHighlightArray[currNotePress] = "red";
      if (continueOnWrong) {
        setCurrNote((prevNote) => prevNote + 1);
        setCurrNotePress((prevNotePress) => prevNotePress + 1);
      }
    }

    setHighlightArray(newHighlightArray);
  };

  //given an array of colors, will update the colors of the notes
  //allows for a better and easier way to update the colors of the notes
  const updateHighlight = (colorArray: string[], notesPerMeasure: number) => {
    for (let i = 0; i < colorArray.length; i++) {
      const noteIndex = i % notesPerMeasure;
      const measureIndex = Math.floor(i / notesPerMeasure);

      const style = document.createElement("style");
      document.head.appendChild(style);
      const sheet = style.sheet;
      sheet?.insertRule(
        `.abcjs-n${noteIndex}.abcjs-m${measureIndex} { fill: ${colorArray[i]}; }`,
        sheet.cssRules.length
      );
    }
  };

  const clearHighlightStyles = () => {
    const styleSheets = document.styleSheets;
    for (let i = 0; i < styleSheets.length; i++) {
      const sheet = styleSheets[i];
      if (sheet.ownerNode && sheet.ownerNode.nodeName === "STYLE") {
        const rules = sheet.cssRules;
        for (let j = 0; j < rules.length; j++) {
          const rule = rules[j];
          if (
            rule instanceof CSSStyleRule &&
            rule.selectorText.includes("abcjs-") &&
            !rule.selectorText.includes(".abcjs-v") &&
            !rule.selectorText.includes("abcjs-staff-extra") &&
            !rule.selectorText.includes("abcjs-bar")
          ) {
            rule.style.fill = "gray";
          }
        }
      }
    }

    // Reset previousHighlightRef to initial state
    previousHighlightRef.current = { noteIndex: 0, measureIndex: 0 };

    // Set the note at index 0 to white
    const style = document.createElement("style");
    document.head.appendChild(style);
    const sheet = style.sheet;
    sheet?.insertRule(
      `.abcjs-n0.abcjs-m0 { fill: gray; }`,
      sheet.cssRules.length
    );
  };

  return {
    treble,
    setTreble,
    bass,
    setBass,
    sharp,
    setSharp,
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
    continueOnWrong,
    setContinueOnWrong,
    testComplete,
    intervals,
    setFinalResults,
    finalResults,
    setSecondsTimer,
    secondsTimer,
    correctNotes,
    wrongNotes,
    sheetScale,
  };
};
