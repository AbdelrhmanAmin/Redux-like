import { useEffect, useMemo, useReducer } from "react";
import { useStore } from "../components/Provider";
import didStateChange from "../utils/didStateChange";

const useSelector = (selector) => {
  if (!selector || typeof selector !== "function") {
    if (process.env.NODE_ENV !== "production") {
      throw new Error("Selector is required");
    }
    return;
  }
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const store = useStore();
  let prevState = useMemo(() => selector(store.getState()), []);
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // Logic to detect if the selected slots have changed, if so then update the component
      const shouldUpdate = didStateChange(prevState, selector, store);
      console.log("selector", {
        shouldUpdate,
        prevState,
        newState: selector(store.getState()),
      });
      if (shouldUpdate) {
        console.log({ prevState });
        prevState = selector(store.getState());
        forceUpdate();
      }
    });
    return () => unsubscribe();
  }, []);
  return selector(store.getState());
};

export default useSelector;
