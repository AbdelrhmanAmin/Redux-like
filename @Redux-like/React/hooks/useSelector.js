import React from "react";
import { useStore } from "../components/Provider";
import didStateChange from "../utils/didStateChange";

const useSelector = (selector) => {
  if (!selector || typeof selector !== "function") {
    if (process.env.NODE_ENV !== "production") {
      throw new Error("Selector is required");
    }
    return;
  }
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  const store = useStore();
  let prevState = React.useMemo(() => selector(store.getState()), []);
  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // Logic to detect if the selected slots have changed, if so then update the component
      const shouldUpdate = didStateChange(prevState, selector, store);
      if (shouldUpdate) {
        prevState = selector(store.getState());
        forceUpdate();
      }
    });
    return () => unsubscribe();
  }, []);
  return selector(store.getState());
};

export default useSelector;
