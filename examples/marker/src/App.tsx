import { Marker } from "../../../src/main";

function App() {
  return (
    <>
      <Marker
        text="aaaahttp://google.combbbb"
        custom={{ link: /http:\/\/google.com/g }}
        matchers={{
          "@link": <span style={{ color: "red" }} />,
        }}
      />
    </>
  );
}

export default App;
