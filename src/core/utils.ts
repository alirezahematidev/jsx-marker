import { cloneElement } from "react";
import { AsteriskPos } from "./types";

export function getAsteriskPos(input: string): AsteriskPos {
  if (/^\*(.*)+\*$/g.test(input)) return AsteriskPos.BOTH;
  if (input.startsWith("*")) return AsteriskPos.END;
  if (input.endsWith("*")) return AsteriskPos.START;

  return AsteriskPos.NONE;
}

export function tryWrap(input: string, wrapper: JSX.Element | undefined, key: string) {
  if (!wrapper) return input;
  return cloneElement(wrapper, { key }, input);
}
