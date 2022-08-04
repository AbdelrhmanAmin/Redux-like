import findDiff from "./findDiff";

const didStateChange = (prevState, selector, store) => {
  const newState = selector(store.getState());
  const diff = findDiff(prevState, newState);
  const hasDiff = Array.isArray(diff)
    ? diff.length > 0
    : Object.keys(diff).length > 0;
  if (hasDiff) {
    return true;
  }
  return false;
};

export default didStateChange;
