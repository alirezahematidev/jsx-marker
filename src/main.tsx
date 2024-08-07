import { Fragment, cloneElement } from "react";
import { CustomMatcher, type MatcherObject } from "./core/types";
import styled from "./core/styled";

interface MarkerProps<Custom extends CustomMatcher> {
  /**
   * The text content to be marked.
   */
  text: string;
  /**
   * Matchers to define patterns and corresponding React elements for styling.
   * Can be an object or a function that returns an object.
   */
  matchers: MatcherObject<Custom> | ((input: string) => MatcherObject<Custom>);
  /**
   * A React element to render for non-matching characters.
   */
  nonMatchElement?: JSX.Element;
  /**
   * Optional HTML tag to use as the wrapper element for the styled text.
   * @default Fragment
   */
  wrapperElement?: JSX.Element | ((parts: (string | React.FunctionComponentElement<any>)[]) => JSX.Element);

  /**
   * Custom matchers which can be used in matchers object using `@` syntax
   */
  custom?: Custom;
}

const Marker = <Custom extends CustomMatcher>(props: MarkerProps<Custom>) => {
  const { text, matchers, nonMatchElement, wrapperElement, custom } = props;

  const styledText = styled(text, matchers, nonMatchElement, custom);

  if (wrapperElement) {
    if (typeof wrapperElement === "function") return wrapperElement(styledText);

    return cloneElement(wrapperElement, {}, styledText);
  }

  return <Fragment>{styledText}</Fragment>;
};

export { Marker };
export type { MarkerProps };
