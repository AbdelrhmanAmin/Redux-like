import EventsManager from "./EventsManager";
import findDiff from "./utils/findDiff";
class Store {
  constructor({ reducer, initialState }) {
    this.state = initialState || {};
    this.eventsManager = new EventsManager();
    if (!reducer) {
      throw new Error("Reducer is required");
    }
    this.reducer = reducer;
  }
  getState = () => {
    return this.state;
  };
  dispatch = ({ type, ...rest }) => {
    const action = { type, ...rest };
    const newState = this.reducer(this.state, action);
    // only update the affected slots in state.
    const diff = findDiff(this.state, newState);
    Object.keys(diff).forEach((key) => {
      this.state = Object.assign({}, this.state, { [key]: newState[key] });
      this.eventsManager.publish();
    });
  };
  subscribe = (listener) => {
    return this.eventsManager.subscribe(listener);
  };
}

export default Store;
