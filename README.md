[![NPM](https://nodei.co/npm/jsx-marker.png)](https://nodei.co/npm/jsx-marker/)

# JSX Marker

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
  return <Marker text="abcdef" matchers={{cd: <span style={{color:"red"}} />}} />;
}
```

## Authors

- [@alirezahematidev](https://github.com/alirezahematidev)

## License

[MIT](https://choosealicense.com/licenses/mit/)