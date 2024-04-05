import { Marker } from "jsx-marker";

function App() {
  return (
    <>
      <Marker
        text="abcdefgh"
        wrapperElementTag="div"
        nonMatchElement={<span style={{ color: "blue" }} />}
        matchers={{ cd: <span style={{ color: "red" }} />, gh: <span style={{ background: "gray" }} /> }}
      />
    </>
  );
}

export default App;
