import { Modifier, MatcherObject, CustomMatcher } from "./types";
import { getModifier } from "./utils";

interface ParseResult {
  parsedMatchers: MatcherObject;
  matchInputs: string[];
}

export function parse(matchers: MatcherObject | ((input: string) => MatcherObject), text: string, custom: CustomMatcher = {}): ParseResult {
  let matchInputs: string[] = [];

  const parsedMatchers: MatcherObject = {};
  const matcherObject = typeof matchers === "function" ? matchers(text) : matchers;

  for (const matcherKey in matcherObject) {
    let matchedKey = matcherKey;

    switch (getModifier(matcherKey)) {
      case Modifier.AT_SIGN:
        {
          const name = matcherKey.slice(1);

          let customValue = custom[name];

          if (!customValue) break;

          if (customValue instanceof RegExp) {
            const match = text.match(customValue);

            if (match) {
              const [current, ...rest] = match;

              if (current) matchedKey = current;

              matchInputs = rest.filter(Boolean);
            } else continue;
          } else {
            matchedKey = customValue;
          }
        }
        break;
      case Modifier.ASTERISK_START:
        {
          const char = matcherKey.slice(0, -1);

          const match = text.match(new RegExp(`${char}(.*)`, "g"));

          if (match) {
            const [current, ...rest] = match;

            if (current) matchedKey = current;

            matchInputs = rest.filter(Boolean);
          }
        }
        break;
      case Modifier.ASTERISK_END:
        {
          const char = matcherKey.slice(1);

          const match = text.match(new RegExp(`(.*)${char}`, "g"));

          if (match) {
            const [current, ...rest] = match;

            if (current) matchedKey = current;

            matchInputs = rest.filter(Boolean);
          }
        }
        break;
      case Modifier.ASTERISK_BOTH:
        if (text.includes(matcherKey.replace(/^\*?([^*]+)\*?$/g, "$1"))) matchedKey = text;
        break;

      case Modifier.BRACKET_CLOSE:
        {
          const chunks = /^\[(.*)\s?,\s?(.*)\]$/g.exec(matcherKey);

          if (!chunks) break;

          const rangeStart = chunks[1].trim();
          const rangeEnd = chunks[2].trim();

          if (rangeStart === rangeEnd) {
            parsedMatchers[rangeStart] = matcherObject[matcherKey];
            break;
          }

          let tuple = [rangeStart, rangeEnd];

          if (text.indexOf(rangeStart) > text.indexOf(rangeEnd)) tuple = [rangeEnd, rangeStart];

          if (!tuple.every((key) => !!key && text.includes(key.replace(/^\*?([^*]+)\*?$/g, "$1")))) break;

          const match = text.match(new RegExp(`${tuple[0]}(.*)${tuple[1]}`, "g"));

          if (match) {
            const [current, ...rest] = match;

            if (current) matchedKey = current;

            matchInputs = rest.filter(Boolean);
          }
        }
        break;
      case Modifier.BRACKET_OPEN:
        {
          const chunks = /^\((.*)\s?,\s?(.*)\)$/g.exec(matcherKey);

          if (!chunks) break;

          const rangeStart = chunks[1].trim();
          const rangeEnd = chunks[2].trim();

          if (rangeStart === rangeEnd) {
            parsedMatchers[rangeStart] = matcherObject[matcherKey];
            break;
          }

          let tuple = [rangeStart, rangeEnd];

          if (text.indexOf(rangeStart) > text.indexOf(rangeEnd)) tuple = [rangeEnd, rangeStart];

          if (!tuple.every((key) => !!key && text.includes(key.replace(/^\*?([^*]+)\*?$/g, "$1")))) break;

          const match = new RegExp(`${tuple[0]}([^${tuple[1]}]+)${tuple[1]}`, "g").exec(text);

          if (match && match.length > 1) {
            const [_, current, ...rest] = match;

            if (current) matchedKey = current;

            matchInputs = rest.filter(Boolean);
          }
        }
        break;

      case Modifier.NONE:
      default:
        break;
    }
    parsedMatchers[matchedKey] = matcherObject[matcherKey];
  }

  return { parsedMatchers, matchInputs };
}
