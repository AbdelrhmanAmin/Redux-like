import { useEffect, useReducer } from "react";
import { useStore } from "../components/Provider";

const useSelector = (selector) => {
  if (!selector || typeof selector !== "function") {
    if (process.env.NODE_ENV !== "production") {
      throw new Error("Selector is required");
    }
    return;
  }
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const store = useStore();
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });
    return () => unsubscribe();
  }, []);
  return selector(store.getState());
};

export default useSelector;
