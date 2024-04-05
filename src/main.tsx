import { Fragment, cloneElement } from "react";

type Matcher = JSX.Element | ((match: string) => JSX.Element);

interface MatcherObject {
  [key: string]: Matcher;
}

interface MarkerProps {
  text: string;
  nonMatchElement?: JSX.Element;
  matchers: MatcherObject | ((input: string) => MatcherObject);
}

function parseMatchers(matchers: MatcherObject | ((input: string) => MatcherObject), text: string): MatcherObject {
  const parsedMatchers: MatcherObject = {};
  const matcherObject = typeof matchers === "function" ? matchers(text) : matchers;

  for (const key in matcherObject) {
    if (key.endsWith("$")) {
      const char = key.slice(0, -1);
      const chunks = text.split(char);
      const concatenatedChunks = chunks.slice(0, -1).map((chunk) => chunk + char);
      concatenatedChunks.forEach((cc) => (parsedMatchers[cc] = matcherObject[key]));
    } else if (key.startsWith("^")) {
      const char = key.slice(1);
      const chunks = text.split(char);
      const concatenatedChunks = chunks.slice(1).map((chunk) => char + chunk);
      concatenatedChunks.forEach((cc) => (parsedMatchers[cc] = matcherObject[key]));
    } else {
      parsedMatchers[key] = matcherObject[key];
    }
  }
  return parsedMatchers;
}

function tryWrap(input: string, wrapper: JSX.Element | undefined, key: string) {
  if (!wrapper) return input;
  return cloneElement(wrapper, { key }, input);
}

function mark({ matchers, nonMatchElement, text }: MarkerProps) {
  const parsedMatchers = parseMatchers(matchers, text);
  const pattern = new RegExp(Object.keys(parsedMatchers).join("|"), "g");
  const matches = text.matchAll(pattern);
  let currentIndex = 0;
  const result = [];

  for (const match of matches) {
    const currentMatch = match[0];
    const matchIndex = match.index!;
    const wrapper = parsedMatchers[currentMatch];
    const chunk = text.substring(currentIndex, matchIndex);
    if (chunk) result.push(tryWrap(chunk, nonMatchElement, `non-match-${currentIndex}`));
    const jsx = typeof wrapper === "function" ? wrapper(currentMatch) : wrapper;
    result.push(cloneElement(jsx, { key: `match-${matchIndex}` }, currentMatch));
    currentIndex = matchIndex + currentMatch.length;
  }

  const remainingChunk = text.substring(currentIndex);
  if (remainingChunk) result.push(tryWrap(remainingChunk, nonMatchElement, `non-match-${currentIndex}`));

  return result;
}

const Marker = ({ matchers, nonMatchElement, text }: MarkerProps) => {
  return <Fragment>{mark({ text, matchers, nonMatchElement })}</Fragment>;
};

export { Marker };
export type { MarkerProps };
