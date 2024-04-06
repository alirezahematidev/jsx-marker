type Matcher = JSX.Element | ((match: string) => JSX.Element);

export interface MatcherObject {
  [key: string]: Matcher;
}

export enum AsteriskPos {
  START,
  END,
  BOTH,
  NONE,
}
