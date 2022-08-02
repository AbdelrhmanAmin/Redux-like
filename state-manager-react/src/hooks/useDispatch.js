import { useStore } from "../components/Provider";
// const dispatch = useDispatch();
// dispatch({ type: "INCREMENT", amount: 1 });
const useDispatch = () => {
  const store = useStore();
  return store.dispatch;
};

export default useDispatch;
