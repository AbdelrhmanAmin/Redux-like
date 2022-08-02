import { useEffect, useState } from "react";
import { useStore } from "./components/Provider";
import Counter from "./Counter";
import { useDispatch, useSelector } from "./hooks";
import Todo from "./TODO";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <h1 style={{ color: "#535bf2" }}>Redux-like!</h1>
      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}>
        <Counter />
        <Todo />
      </div>
    </div>
  );
}

export default App;
