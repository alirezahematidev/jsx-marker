type Matcher = JSX.Element | ((...matches: string[]) => JSX.Element);

export type MatcherObject<Custom extends CustomMatcher> =
  | {
      [key: string]: Matcher;
    }
  | {
      [key in `@${keyof Custom & string}`]: Matcher;
    };

export type CustomMatcher = {
  [key: string]: string | RegExp;
};

export enum Modifier {
  ASTERISK_START,
  ASTERISK_END,
  ASTERISK_BOTH,
  BRACKET_OPEN,
  BRACKET_CLOSE,
  AT_SIGN,
  NONE,
}
