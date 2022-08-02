import { useEffect, useReducer } from "react";
import { useStore } from "../components/Provider";

// useSelector(state => state.count)
const useSelector = (selector) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const store = useStore();
  useEffect(() => {
    const token = store.subscribe("stateChange", () => {
      forceUpdate();
      console.log(store.getState());
    });
    return () => {
      store.unsubscribe(token);
    };
  }, []);
  return selector(store.getState());
};

export default useSelector;
