export const Colours = {
  lightGray: '#f2f2f2',
  midGray: '#696969',
  darkGray: '#333333',

  lightRed: '#f8dfdf',
  softRed: '#e38080',
  midRed: '#d54040',
  darkRed: '#c32b2b',

  lightYellow: '#ffee92',
  darkYellow: '#ffdd24',

  lightGreen: '#c2e9b4',
  softGreen: '#86d46a',
  midGreen: '#52ab32',
  darkGreen: '#357021',

  lightOrange: '#fed5bc',
  softOrange: '#fcaa79',
  midOrange: '#fb8036',
  darkOrange: '#e35905',

  /// NEUTRAL
  black: '#000000',
  white: '#ffffff',

  /// RULE 60-30-10
  green: '#3fae4d',
  blue: '#66a4d6',
  gray: '#6d6d6d',
} as const;

export type ColoursType = keyof typeof Colours;
