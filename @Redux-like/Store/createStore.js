import findDiff from "./utils/findDiff";

const isStateOmitted = (initialState, enhancer) => {
  return typeof initialState === "function" && typeof enhancer === "undefined";
};

const createStore = (rootReducer, initialState, enhancer) => {
  let currentState = {};
  const listeners = [];
  if (isStateOmitted(initialState, enhancer)) {
    enhancer = initialState;
    initialState = {};
  }
  // rootReducer(state, action) => newState
  currentState = rootReducer(initialState, {});
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
    const diff = findDiff(state, newState);
    // only update the affected slots in state.
    // @TODO: try to optimize this. Redux uses `currentState = reducer(currentState, action)`
    Object.keys(diff).forEach((key) => {
      currentState = Object.assign({}, state, { [key]: newState[key] });
    });
    publish();
  };
  const getState = () => {
    return currentState;
  };
  return {
    dispatch,
    subscribe,
    getState,
  };
};

export default createStore;
