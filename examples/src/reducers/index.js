import { combineReducers } from "redux-like-core";
import counterReducer from "./counterReducer";
import itemsReducer from "./itemsReducer";

const undoable = (reducer) => {
  const initialState = {
    past: [],
    present: { count: 0, items: [] },
    future: [],
  };
  return (state = initialState, action) => {
    const { past, present, future } = state;
    if (action.type === "PAST") {
      const lastAction = past.pop();
      const newPresent = {
        count: lastAction.count,
        items: lastAction.items,
      };
      const newFuture = [present, ...future];
      return { past, present: newPresent, future: newFuture };
    }
    if (action.type === "FUTURE") {
      const nextAction = future.shift();
      const newPresent = {
        count: nextAction.count,
        items: nextAction.items,
      };
      const newPast = [...past, present];
      return { past: newPast, present: newPresent, future };
    }
    const newPresent = reducer(present, action);
    if (present === newPresent) {
      return state;
    }
    return {
      past: [...past, present],
      present: newPresent,
      future: [],
    };
  };
};

const rootReducer = undoable(
  combineReducers({
    count: counterReducer,
    items: itemsReducer,
  })
);

export default rootReducer;
