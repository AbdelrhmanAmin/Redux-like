import { useEffect, useMemo, useReducer } from "react";
import { useStore } from "../components/Provider";
import findDiff from "../utils/findDiff";

const useSelector = (selector) => {
  if (!selector || typeof selector !== "function") {
    if (process.env.NODE_ENV !== "production") {
      throw new Error("Selector is required");
    }
    return;
  }
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const store = useStore();
  let prevSelectedSlots = selector(store.getState());
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // Logic to detect if the selected slots have changed, if so then update the component
      const newSelectedSlots = selector(store.getState());
      const diff = findDiff(prevSelectedSlots, newSelectedSlots);
      const hasDiff = Array.isArray(diff)
        ? diff.length > 0
        : Object.keys(diff).length > 0;
      if (hasDiff) {
        prevSelectedSlots = newSelectedSlots;
        forceUpdate();
      }
    });
    return () => unsubscribe();
  }, []);
  return selector(store.getState());
};

export default useSelector;
