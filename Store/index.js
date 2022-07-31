import Store from "./Store";
import rootReducer from "../Reducers";
export default new Store({
  reducers: rootReducer,
  initialState: {
    items: [],
  },
});
