import react from "react";
import abcjs, { AbcVisualParams } from "abcjs";
import { NotationProps } from "../Utils/NotationUtils";

const Notation: react.FC<NotationProps> = ({ notation, renderOptions }) => {
  const notationRef = react.useRef<HTMLDivElement>(null);

  react.useEffect(() => {
    if (notationRef.current) {
      abcjs.renderAbc(
        notationRef.current,
        notation,
        renderOptions as AbcVisualParams
      );
    }
  }, [notation, renderOptions]);

  return <div ref={notationRef}></div>;
};

export default Notation;
