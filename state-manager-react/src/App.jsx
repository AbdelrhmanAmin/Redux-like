import { useEffect, useState } from "react";
import { useStore } from "./components/Provider";
import { useDispatch, useSelector } from "./hooks";

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);
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
      <strong style={{ fontSize: "36px", marginBottom: "30px" }}>
        Count: {count}
      </strong>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button onClick={() => dispatch({ type: "INCREMENT", amount: 1 })}>
          Increment
        </button>
        <button
          onClick={() =>
            count > 0 && dispatch({ type: "DECREMENT", amount: 1 })
          }
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default App;
