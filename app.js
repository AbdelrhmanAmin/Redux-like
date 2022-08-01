const { createStore, combineReducers } = require("./Store");

const counterReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: (state?.count || 0) + (action.amount || 1) };
    case "DECREMENT":
      return { ...state, count: (state?.count || 0) - (action.amount || 1) };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  count: counterReducer,
});

const store = createStore(rootReducer);

store.subscribe("stateChange", () => console.log(store.getState()));

store.dispatch({ type: "INCREMENT", amount: 2 });
store.dispatch({ type: "DECREMENT", amount: 1 });
store.dispatch({ type: "INCREMENT" });
