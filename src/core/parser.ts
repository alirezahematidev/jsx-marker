import { AsteriskPos, MatcherObject } from "./types";
import { getAsteriskPos } from "./utils";

export function parse(matchers: MatcherObject | ((input: string) => MatcherObject), text: string): MatcherObject {
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
        break;
      default: {
        if (!/^\[(.*)+\]$/g.test(matcherKey.slice())) continue;

        const chunks = /^\[(.*)\s?,\s?(.*)\]$/g.exec(matcherKey);

        if (!chunks) continue;

        const rangeStart = chunks[1].trim();
        const rangeEnd = chunks[2].trim();

        if (rangeStart === rangeEnd) {
          parsedMatchers[rangeStart] = matcherObject[matcherKey];
          continue;
        }

        let tuple = [rangeStart, rangeEnd];

        if (text.indexOf(rangeStart) > text.indexOf(rangeEnd)) tuple = [rangeEnd, rangeStart];

        if (!tuple.every((key) => !!key && text.includes(key.replace(/^\*?([^*]+)\*?$/g, "$1")))) continue;

        const match = text.match(new RegExp(`${tuple[0]}(.*)${tuple[1]}`, "g"));

        if (match && match[0]) matchedKey = match[0];
      }
    }
    parsedMatchers[matchedKey] = matcherObject[matcherKey];
  }

  return parsedMatchers;
}
