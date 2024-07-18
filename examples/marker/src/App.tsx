import { Marker } from "../../../src/main";
function App() {
  return (
    <>
      <Marker text="abcdef" matchers={{ d: <span style={{ color: "red" }} /> }} />
      <br />
      <Marker text="abcdef" matchers={{ "d*": <span style={{ color: "red" }} /> }} />
      <br />
      <Marker text="abcdef" matchers={{ "*d": <span style={{ color: "red" }} /> }} />
      <br />
      <Marker text="abcdef" matchers={{ "[b,f]": <span style={{ color: "red" }} /> }} />
      <br />
      <Marker text="abcdef" matchers={{ "(b,f)": <span style={{ color: "red" }} /> }} />
      <br />
      <Marker text="abcdef" matchers={{ "*": <span style={{ color: "red" }} /> }} />
      <br />
      <Marker text="abcdef" matchers={{ "*d*": <span style={{ color: "red" }} /> }} />
      <br />
      <Marker text="abcdef" custom={{ middle: /cd/g }} matchers={{ "@middle": <span style={{ color: "red" }} /> }} />
      <br />
      <Marker text="abcdef@middle" matchers={{ "@middle": <span style={{ color: "red" }} /> }} />
    </>
  );
}

export default App;
