import { useEffect, useState } from "react";
import { useStore } from "./components/Provider";

function App() {
  const store = useStore();
  return (
    <div>
      <h1>Count: {store.getState().count}</h1>
      <button onClick={() => store.dispatch({ type: "INCREMENT", amount: 1 })}>
        Increment
      </button>
    </div>
  );
}

export default App;
