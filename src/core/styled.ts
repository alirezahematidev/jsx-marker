import { cloneElement } from "react";
import { parse } from "./parser";
import type { CustomMatcher, MatcherObject } from "./types";
import { tryWrap } from "./utils";

function styled(
  text: string,
  matchers: MatcherObject | ((text: string) => MatcherObject),
  nonMatchElement?: JSX.Element,
  custom?: CustomMatcher
) {
  const { parsedMatchers, matchInputs } = parse(matchers, text, custom);

  const pattern = new RegExp(Object.keys(parsedMatchers).join("|"), "g");

  const matches = text.matchAll(pattern);

  let currentIndex = 0;

  const result = [];

  for (const match of matches) {
    const [currentMatch] = match;

    if (!currentMatch) continue;

    const matchIndex = match.index!;

    const wrapper = parsedMatchers[currentMatch];

    const chunk = text.substring(currentIndex, matchIndex);

    if (chunk) result.push(tryWrap(chunk, nonMatchElement, `non-match-${currentIndex}`));

    const jsx = typeof wrapper === "function" ? wrapper(currentMatch, ...matchInputs) : wrapper;

    result.push(cloneElement(jsx, { key: `match-${matchIndex}` }, jsx.props?.children ?? currentMatch));

    currentIndex = matchIndex + currentMatch.length;
  }

  const remainingChunk = text.substring(currentIndex);

  if (remainingChunk) result.push(tryWrap(remainingChunk, nonMatchElement, `non-match-${currentIndex}`));

  return result;
}

export default styled;
