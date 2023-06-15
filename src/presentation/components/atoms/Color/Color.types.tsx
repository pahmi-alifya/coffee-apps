export type ColorType =
  | 'skobeloff'
  | 'red1'
  | 'red2'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'brown'
  | 'sacramento_green'
  | 'electric_indigo'
  | 'neutral'
  | 'gradients';
export type ColorTone =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10';

export type RecordColorStyle = Record<ColorType, Record<ColorTone, string>>;
