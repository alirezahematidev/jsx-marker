import { Modifier, MatcherObject } from "./types";
import { getModifier } from "./utils";

export function parse(
  matchers: MatcherObject | ((input: string) => MatcherObject),
  text: string,
  custom: Record<string, string | RegExp> = {}
): MatcherObject {
  const parsedMatchers: MatcherObject = {};
  const matcherObject = typeof matchers === "function" ? matchers(text) : matchers;

  for (const matcherKey in matcherObject) {
    let matchedKey = matcherKey;

    switch (getModifier(matcherKey)) {
      case Modifier.CUSTOM:
        {
          const name = matcherKey.slice(1);

          const customValue = custom[name];

          if (!customValue) continue;

          if (customValue instanceof RegExp) {
            const match = text.match(customValue);

            if (match && match[0]) matchedKey = match[0];
          } else {
            matchedKey = customValue;
          }
        }
        break;
      case Modifier.ASTERISK_START:
        {
          const char = matcherKey.slice(0, -1);

          const match = text.match(new RegExp(`${char}(.*)`, "g"));

          if (match && match[0]) matchedKey = match[0];
        }
        break;
      case Modifier.ASTERISK_END:
        {
          const char = matcherKey.slice(1);

          const match = text.match(new RegExp(`(.*)${char}`, "g"));

          if (match && match[0]) matchedKey = match[0];
        }
        break;
      case Modifier.ASTERISK_BOTH:
        if (text.includes(matcherKey.replace(/^\*?([^*]+)\*?$/g, "$1"))) matchedKey = text;
        break;
      default: {
        if (!/^\[(.*)+\]$/g.test(matcherKey.slice())) break;

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

        if (match && match[0]) matchedKey = match[0];
      }
    }
    parsedMatchers[matchedKey] = matcherObject[matcherKey];
  }

  return parsedMatchers;
}
