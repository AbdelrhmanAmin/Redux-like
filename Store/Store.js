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
      this.state[key] = newState[key];
      // publish ONLY to the affected subscribers e.g (count, items, ...etc)
      this.eventsManager.publish(key, newState[key]);
    });
  };
  // to avoid having to use this.store.eventsManager.method_name()
  subscribe = (action, callback) => {
    return this.eventsManager.subscribe(action, callback);
  };
  unsubscribe = (action, callback) => {
    return this.eventsManager.unsubscribe(action, callback);
  };
  publish = (action, payload) => {
    return this.eventsManager.publish(action, payload);
  };
  // ------------------------------------------------------------
}

export default Store;
