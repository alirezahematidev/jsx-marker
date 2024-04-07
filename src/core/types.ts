type Matcher = JSX.Element | ((match: string) => JSX.Element);

export interface MatcherObject {
  [key: string]: Matcher;
}

export enum Modifier {
  ASTERISK_START,
  ASTERISK_END,
  ASTERISK_BOTH,
  CUSTOM,
  NONE,
}
