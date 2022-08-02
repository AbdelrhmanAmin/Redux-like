import { useStore } from "../components/Provider";

// useSelector(state => state.count)
const useSelector = (selector) => {
  const store = useStore();
  return selector(store.getState());
};

export default useSelector;
