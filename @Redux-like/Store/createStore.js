import Store from "./Store";

const isStateOmitted = (initialState, enhancer) => {
  return typeof initialState === "function" && typeof enhancer === "undefined";
};

const createStore = (rootReducer, initialState, enhancer) => {
  if (isStateOmitted(initialState, enhancer)) {
    enhancer = initialState;
    initialState = {};
  }
  // rootReducer(state, action) => newState
  const state = rootReducer(initialState, {});
  if(enhancer){
    return enhancer(createStore)(rootReducer, state);
  }
  return new Store({ reducer: rootReducer, initialState: state });
};

export default createStore;
