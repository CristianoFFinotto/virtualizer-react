import { Virtualizer } from "./Virtualizer";

function App() {
  return (
    <Virtualizer
      data={Array.from({ length: 100 }).map((_, key) => ({
        id: key.toString(),
        item: <div style={{ height: 100 }}>{key.toString()}</div>,
      }))}
      itemsToBeRendered={6}
      style={{
        height: 500,
        width: 800,
        overflowY: "scroll",
        border: "1px solid lime",
        textAlign: "center",
      }}
    />
  );
}

export default App;
