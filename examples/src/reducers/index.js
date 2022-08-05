import { combineReducers } from "redux-like";
import counterReducer from "./counterReducer";
import itemsReducer from "./itemsReducer";

const rootReducer = combineReducers({
  count: counterReducer,
  items: itemsReducer,
});

export default rootReducer;