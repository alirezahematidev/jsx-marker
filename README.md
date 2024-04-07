[![NPM](https://nodei.co/npm/jsx-marker.png)](https://nodei.co/npm/jsx-marker/)

# Getting Started

JSX Marker is a versatile React component for styling text based on custom patterns and matchers. With JSX Marker, you can easily apply styling to specific portion of the text within your React applications.

[![Version][version-badge]][package]
[![NPM Downloads][dw-badge]][package]

[dw-badge]: https://img.shields.io/npm/dw/jsx-marker
[version-badge]: https://img.shields.io/npm/v/jsx-marker
[package]: https://www.npmjs.com/package/jsx-marker

## Installation

To install jsx-marker, you will need to have [npm](https://npmjs.com), [yarn](https://yarnpkg.com) or [pnpm](https://pnpm.io) installed on your system. Once you have one of these package managers set up, you can install jsx-marker by running the following command:

```bash
  npm install --save jsx-marker
```

```bash
  yarn add jsx-marker
```

```bash
  pnpm add jsx-marker
```

This will install the latest version of jsx-marker and add it as a dependency to your project.

## Usage/Examples

```jsx
import { Marker } from "jsx-marker";

function App() {
  return (
    <>
      {/* Matches 'd' character */}
      <Marker text="abcdef" matchers={{d: <span style={{color:"red"}} />}} />

      {/* Matches portions of the text which starts with 'd' */}
      <Marker text="abcdef" matchers={{"d*": <span style={{color:"red"}} />}} />

      {/* Matches portions of the text which ends with 'd' */}
      <Marker text="abcdef" matchers={{"*d": <span style={{color:"red"}} />}} />

      {/* Matches portions of the text between 'b' and 'f'. */}
      <Marker text="abcdef" matchers={{ "(b,f)": <span style={{ color: "red" }} /> }} />

      {/* Matches portions of the text between 'b' and 'f' including 'b' and 'f' */}
      <Marker text="abcdef" matchers={{ "[b,f]": <span style={{ color: "red" }} /> }} />

      {/* Define custom matchers and link them into matchers object using @ */}
      <Marker text="abcdef" custom={{ middle: /cd/g }} matchers={{ "@middle": <span style={{ color: "red" }} /> }} />

      {/* Matches all of the text */}
      <Marker text="abcdef" matchers={{"*": <span style={{color:"red"}} />}} />

      {/* Also matches all of the text if the text contains the <char> */}
      <Marker text="abcdef" matchers={{"*<char>*": <span style={{color:"red"}} />}} />

    </>
  )
}
```

## Authors

- [@alirezahematidev](https://github.com/alirezahematidev)

## License

[MIT](https://choosealicense.com/licenses/mit/)