import Store from "./Store";

const createStore = (rootReducer) => {
  // rootReducer(state = {}, action = {})
  const state = rootReducer({}, {});
  return new Store({ reducer: rootReducer, initialState: state });
};

export default createStore;
