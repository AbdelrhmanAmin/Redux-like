import Counter from "./Counter";
import Todo from "./Todo";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <h1 style={{ color: "#535bf2" }}>Redux-like!</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Counter />
        <Todo />
      </div>
    </div>
  );
}

export default App;
