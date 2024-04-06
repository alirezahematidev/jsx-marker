import { cloneElement } from "react";

type Matcher = JSX.Element | ((match: string) => JSX.Element);

export interface MatcherObject {
  [key: string]: Matcher;
}

enum AsteriskPos {
  START,
  END,
  BOTH,
  NONE,
}

function getAsteriskPos(input: string): AsteriskPos {
  if (/^\*(.*)+\*$/g.test(input)) return AsteriskPos.BOTH;
  if (input.startsWith("*")) return AsteriskPos.END;
  if (input.endsWith("*")) return AsteriskPos.START;

  return AsteriskPos.NONE;
}

function parseMatchers(matchers: MatcherObject | ((input: string) => MatcherObject), text: string): MatcherObject {
  const parsedMatchers: MatcherObject = {};
  const matcherObject = typeof matchers === "function" ? matchers(text) : matchers;

  for (const matcherKey in matcherObject) {
    let matchedKey = matcherKey;

    switch (getAsteriskPos(matcherKey)) {
      case AsteriskPos.START:
        {
          const char = matcherKey.slice(0, -1);

          const match = text.match(new RegExp(`${char}(.*)`, "g"));

          if (match && match[0]) matchedKey = match[0];
        }
        break;
      case AsteriskPos.END:
        {
          const char = matcherKey.slice(1);

          const match = text.match(new RegExp(`(.*)${char}`, "g"));

          if (match && match[0]) matchedKey = match[0];
        }
        break;
      case AsteriskPos.BOTH:
        if (text.includes(matcherKey.replace(/^\*?([^*]+)\*?$/g, "$1"))) matchedKey = text;
        else continue;
    }
    parsedMatchers[matchedKey] = matcherObject[matcherKey];
  }

  return parsedMatchers;
}

function tryWrap(input: string, wrapper: JSX.Element | undefined, key: string) {
  if (!wrapper) return input;
  return cloneElement(wrapper, { key }, input);
}

export function mark(text: string, matchers: MatcherObject | ((input: string) => MatcherObject), nonMatchElement?: JSX.Element) {
  const parsedMatchers = parseMatchers(matchers, text);

  const pattern = new RegExp(Object.keys(parsedMatchers).join("|"), "g");

  const matches = text.matchAll(pattern);

  let currentIndex = 0;

  const result = [];

  for (const match of matches) {
    const currentMatch = match[0];

    if (!currentMatch) continue;

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
