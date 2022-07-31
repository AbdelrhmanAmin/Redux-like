import Store from "./Store";
import rootReducer from "../Reducers";
import { actions } from "../Actions";
export default new Store({
  reducers: rootReducer,
  actions: actions,
});
