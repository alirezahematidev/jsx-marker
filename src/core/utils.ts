import { cloneElement } from "react";
import { Modifier } from "./types";

export function getModifier(input: string): Modifier {
  if (/^@./g.test(input)) return Modifier.AT_SIGN;

  if (/^\*(.*)+\*$/g.test(input)) return Modifier.ASTERISK_BOTH;

  if (/^\*./g.test(input)) return Modifier.ASTERISK_END;

  if (/(.*)+\*$/g.test(input)) return Modifier.ASTERISK_START;

  if (/^\[(.*)+\]$/g.test(input)) return Modifier.BRACKET_CLOSE;

  if (/^\((.*)+\)$/g.test(input)) return Modifier.BRACKET_OPEN;

  return Modifier.NONE;
}

export function tryWrap(input: string, wrapper: JSX.Element | undefined, key: string) {
  if (!wrapper) return input;
  return cloneElement(wrapper, { key }, input);
}
