import findDiff from "./utils/findDiff";

const isStateOmitted = (initialState, enhancer) => {
  return typeof initialState === "function" && typeof enhancer === "undefined";
};

const createStore = (rootReducer, initialState, enhancer) => {
  let state = {};
  const listeners = [];
  if (isStateOmitted(initialState, enhancer)) {
    enhancer = initialState;
    initialState = {};
  }
  // rootReducer(state, action) => newState
  state = rootReducer(initialState, {});
  if (enhancer) {
    return enhancer(createStore)(rootReducer, state);
  }
  const subscribe = (listener) => {
    listeners.push(listener);
    const unsubscribe = () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
    return unsubscribe;
  };
  const publish = () => {
    listeners.forEach((listener) => {
      listener();
    });
  };
  const dispatch = ({ type, ...rest }) => {
    const action = { type, ...rest };
    const newState = rootReducer(state, action);
    state = newState;
    publish();
  };
  const getState = () => {
    return state;
  };
  return {
    dispatch,
    subscribe,
    getState,
  };
};

export default createStore;
