import { useEffect, useReducer } from "react";
import { useStore } from "../components/Provider";

// useSelector(state => state.count)
const useSelector = (selector) => {
  if (!selector || typeof selector !== "function") {
    if (process.env.NODE_ENV !== "production") {
      throw new Error("Selector is required");
    }
    return;
  }
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const store = useStore();
  const target = selector.toString().split(".");
  const key = target[1]; // the word after "state"
  useEffect(() => {
    const token = store.subscribe(key, () => {
      forceUpdate();
    });
    return () => {
      store.unsubscribe(token);
    };
  }, []);
  return selector(store.getState());
};

export default useSelector;
