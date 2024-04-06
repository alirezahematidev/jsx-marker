import { Marker } from "jsx-marker";

function App() {
  return (
    <>
      <Marker text="abcdefgh" wrapperElementTag="div" matchers={{ d: <span style={{ color: "red" }} /> }} />

      <Marker text="abcdefgh" wrapperElementTag="div" matchers={{ "*d": <span style={{ color: "red" }} /> }} />

      <Marker text="abcdefgh" wrapperElementTag="div" matchers={{ "d*": <span style={{ color: "red" }} /> }} />

      <Marker text="abcdefgh" wrapperElementTag="div" matchers={{ "[b,f]": <span style={{ color: "red" }} /> }} />

      <Marker text="abcdefgh" wrapperElementTag="div" matchers={{ "*": <span style={{ color: "red" }} /> }} />
    </>
  );
}

export default App;
