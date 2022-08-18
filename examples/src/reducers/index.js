import { combineReducers } from "redux-like-core";
import counterReducer from "./counterReducer";
import itemsReducer from "./itemsReducer";

const createNewPast = (state, action) => {
  return {
    count: state.count,
    items: state.items,
    action: action.type,
    timestamp: Date.now(),
  };
};

const createPastObject = (pastObject, newInstance) => {
  return {
    ...pastObject,
    [newInstance.timestamp]: newInstance,
  };
};

// @TODO: in the future I don't want to remove, I only want to travel (preview)
const getActionFromPast = (past, target) => {
  const _past = { ...past };
  if (!_past[target]) {
    // get the last one
    const keys = Object.keys(_past);
    const lastKey = keys[keys.length - 1];
    const target = _past[lastKey];
    return target;
  }
  const action = _past[target];
  return action;
};

const removeActionFromPast = (past, target) => {
  const _past = { ...past };
  delete _past[target];
  return _past;
};

const undoable = (reducer) => {
  const initialState = {
    past: {},
    present: { count: 0, items: [] },
  };
  return (state = initialState, action) => {
    if (!action.type) return state;
    const { past, present } = state;
    if (action.type === "TRAVEL") {
      let newPast = { ...past },
        timestamp;
      if (action.hasOwnProperty("timestamp")) {
        timestamp = action.timestamp;
        if (action.hasOwnProperty("shouldRemove")) {
          newPast = removeActionFromPast(past, timestamp);
          // Update the present only if the current timestamp is the same as the one we are removing

          return { past: newPast, present };
        }
      }
      const target = getActionFromPast(past, timestamp);
      const newPresent = {
        count: target.count,
        items: target.items,
        timestamp: target.timestamp,
      };
      return { past: newPast, present: newPresent };
    }
    const newPresent = reducer(present, action);
    if (present === newPresent) {
      return state;
    }
    const newPast = createPastObject(past, createNewPast(present, action));
    return {
      past: newPast,
      present: newPresent,
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
