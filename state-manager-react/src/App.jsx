import { useEffect, useState } from "react";
import { useStore } from "./components/Provider";
import { useDispatch, useSelector } from "./hooks";

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT", amount: 1 })}>
        Increment
      </button>
    </div>
  );
}

export default App;
