[![NPM](https://nodei.co/npm/jsx-marker.png)](https://nodei.co/npm/jsx-marker/)

# JSX Marker

Welcome to our date picker for React applications! This package offers a customizable and localized solution for selecting dates in your projects. With support for the Jalaali calendar system, our date picker allows you to easily implement date selection in your React projects, whether you need to select a single date, or range of dates. Get started now by installing the package and integrating it into your React code.

[![Version][version-badge]][package]
[![NPM Downloads][dw-badge]][package]

[dw-badge]: https://img.shields.io/npm/dw/jsx-marker
[version-badge]: https://img.shields.io/npm/v/jsx-marker
[package]: https://www.npmjs.com/package/jsx-marker

## Installation

To install jsx-marker, you will need to have [npm](https://npmjs.com) or [yarn](https://yarnpkg.com) installed on your system. Once you have one of these package managers set up, you can install jsx-marker by running the following command:

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

```javascript
import { Marker } from "jsx-marker";

function App() {
  return <Marker text="abcdef" matchers={{cd: <span style={{color:"red"}} />}} />;
}
```

## Authors

- [@alirezahematidev](https://github.com/alirezahematidev)

## License

[MIT](https://choosealicense.com/licenses/mit/)