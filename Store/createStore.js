const { Store } = require("./Store");

const createStore = (rootReducer) => {
  // rootReducer(state = {}, action = {})
  const state = rootReducer({}, {});
  return new Store({ reducer: rootReducer, initialState: state });
};

module.exports = {
  createStore,
}