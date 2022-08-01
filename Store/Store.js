const { EventsManager } = require("./EventsManager");
const { findDiff } = require("./utils/findDiff");
class Store {
  constructor({ reducer, initialState }) {
    this.state = initialState || {};
    this.eventsManager = new EventsManager();
    if (!reducer) {
      throw new Error("Reducer is required");
    }
    this.reducer = reducer;
    // A proxy to supervise the state and publish updates to the subscribers.
    this.state = new Proxy(this.state, {
      set: (target, key, value) => {
        target[key] = value;
        this.eventsManager.publish("stateChange", {
          key,
          value,
        });
        return true;
      },
    });
  }
  getState() {
    return this.state;
  }
  dispatch({ type, ...rest }) {
    const action = { type, ...rest };
    const newState = this.reducer(this.state, action);
    // only update the affected slots in state.
    const diff = findDiff(this.state, newState);
    Object.keys(diff).forEach((key) => {
      this.state[key] = newState[key];
    });
  }
  // to avoid having to use this.store.eventsManager.method_name()
  subscribe(action, callback) {
    return this.eventsManager.subscribe(action, callback);
  }
  unsubscribe(action, callback) {
    return this.eventsManager.unsubscribe(action, callback);
  }
  publish(action, payload) {
    return this.eventsManager.publish(action, payload);
  }
  // ------------------------------------------------------------
}

module.exports = {
  Store,
};
