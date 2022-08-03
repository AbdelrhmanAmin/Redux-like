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
  // useSelector(state => state[_key_])
  const target = selector.toString().split("."); // ["(state) => state", _key_]
  const key = target[1] || "state"; // in case that he did "(state) => state" without specifying the key slot e.g (state.count).
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
