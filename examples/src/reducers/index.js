import { combineReducers } from "redux-like-core";
import counterReducer from "./counterReducer";
import itemsReducer from "./itemsReducer";

export const historyReducer = (state = {}, action) => {
  if (!state.history) return state;
  console.log({ state });
  const history = state.history || {};
  if (action.type === "HISTORY/TRAVEL") {
    return {
      ...history[action.payload.time].currentState,
      history,
    };
  } else {
    history[Date.now()] = {
      // the current state the store
      currentState: state,
      action: action.type,
    };
  }
  return {
    ...state,
    history,
  };
};

const rootReducer = combineReducers({
  count: counterReducer,
  items: itemsReducer,
  history: historyReducer,
});

export default rootReducer;
