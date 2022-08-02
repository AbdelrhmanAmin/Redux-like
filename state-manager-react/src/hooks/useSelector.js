// useSelector(state => state.count)
const useSelector = (selector) => {
  const store = useContext(StoreContext);
  return selector(store.getState());
};

export default useSelector;
