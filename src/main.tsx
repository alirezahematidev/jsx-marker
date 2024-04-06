import { Fragment, ReactHTML, createElement } from "react";
import { type MatcherObject } from "./core/types";
import { styled } from "./core/styled";

interface MarkerProps {
  /**
   * The text content to be marked.
   */
  text: string;
  /**
   * Matchers to define patterns and corresponding React elements for styling.
   * Can be an object or a function that returns an object.
   */
  matchers: MatcherObject | ((input: string) => MatcherObject);
  /**
   * A React element to render for non-matching characters.
   */
  nonMatchElement?: JSX.Element;
  /**
   * Optional HTML tag to use as the wrapper element for the styled text.
   * @default Fragment
   */
  wrapperElementTag?: keyof ReactHTML;
}

const Marker = (props: MarkerProps) => {
  const { text, matchers, nonMatchElement, wrapperElementTag } = props;

  const styledText = styled(text, matchers, nonMatchElement);

  if (wrapperElementTag) return createElement(wrapperElementTag, { children: styledText });

  return <Fragment>{styledText}</Fragment>;
};

export { Marker };
export type { MarkerProps };
