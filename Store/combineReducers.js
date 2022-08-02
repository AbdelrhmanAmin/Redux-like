/*
  reducers is an object with keys that are the names of the reducers and the name of the slot in the state.
  e.g. reducers = {
    items: itemsReducer,
  }
*/

const combineReducers = (reducers) => {
  const rootReducer = (state = {}, action) => {
    return Object.keys(reducers).reduce((newState, key) => {
      newState[key] = reducers[key](state[key], action);
      return newState;
    }, {});
  };
  return rootReducer;
};

export default combineReducers;
