// const { createStore, combineReducers } = require("./Store");

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + (action?.amount || 1);
    case "DECREMENT":
      return state - (action?.amount || 1);
    default:
      return state;
  }
};

const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.item];
    case "REMOVE_ITEM":
      return state.filter((item) => item !== action.item);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  count: counterReducer,
  items: itemsReducer,
});

const store = createStore(rootReducer);

const token = store.subscribe("stateChange", () =>
  console.log(store.getState())
);

store.dispatch({ type: "INCREMENT", amount: -2 });
store.dispatch({ type: "DECREMENT", amount: 1 });
store.dispatch({ type: "INCREMENT" });
store.unsubscribe("stateChange", token);
store.dispatch({ type: "ADD_ITEM", item: "item1" });
store.dispatch({ type: "ADD_ITEM", item: "item2" });
store.dispatch({ type: "ADD_ITEM", item: "item3" });
store.dispatch({ type: "REMOVE_ITEM", item: "item2" });
