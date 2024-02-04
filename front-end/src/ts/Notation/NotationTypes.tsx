export interface NotationProps {
  notation: string;
  renderOptions?: RenderOptions;
}

export interface RenderOptions {
  accentAbove?: boolean;
  add_classes?: boolean;
  afterParsing?: (tune: any, tuneNumber: number, abcString: string) => void;
  ariaLabel?: string;
  clickListener?: (
    event: any,
    tuneNumber: number,
    classes: string[],
    analysis: any,
    drag: any,
    mouseEvent: MouseEvent
  ) => void;
  dragColor?: string;
  dragging?: any;
  expandToWidest?: boolean;
  foregroundColor?: string;
  format?: {
    [key: string]: any;
  };
  hint_measures?: boolean;
  intitalClef?: boolean;
  jazzchords?: boolean;
  lineThickness?: number;
  germanAlphabet?: boolean;
  lineBreaks?: number[];
  minPadding?: number;
  oneSvgPerLine?: boolean;
  paddingbottom?: number;
  paddingleft?: number;
  paddingright?: number;
  paddingtop?: number;
  print?: boolean;
  responsive?: string;
  scale?: number;
  scrollHorizontal?: boolean;
  selectionColor?: string;
  selectTypes?: any;
  showDebug?: any;
  staffWidth?: number;
  startingTune?: number;
  textboxpadding?: number;
  tablatures?: any;
  viewportHorizontal?: boolean;
  viewportVertical?: boolean;
  visualTranspose?: number;
  wrap?: any;
}
