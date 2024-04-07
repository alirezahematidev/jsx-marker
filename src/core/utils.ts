import { cloneElement } from "react";
import { Modifier } from "./types";

export function getModifier(input: string): Modifier {
  if (input.startsWith("@")) return Modifier.CUSTOM;

  if (/^\*(.*)+\*$/g.test(input)) return Modifier.ASTERISK_BOTH;
  if (input.startsWith("*")) return Modifier.ASTERISK_END;
  if (input.endsWith("*")) return Modifier.ASTERISK_START;

  return Modifier.NONE;
}

export function tryWrap(input: string, wrapper: JSX.Element | undefined, key: string) {
  if (!wrapper) return input;
  return cloneElement(wrapper, { key }, input);
}
