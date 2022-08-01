const { EventsManager } = require("./EventsManager");
class Store {
  constructor({ reducers, initialState }) {
    this.state = initialState || {};
    this.events = new EventsManager();
    this.reducers = reducers || [];
    // A proxy to supervise the state and publish updates to the subscribers.
    this.state = new Proxy(this.state, {
      set: (target, key, value) => {
        target[key] = value;
        this.events.publish("stateChange", {
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
    this.reducers.forEach((reducer) => {
      const newState = reducer(this.state, { type, ...rest });
      // if the reducer returns the same state, it means it didn't return a new state.
      if (newState !== this.state) {
        this.state = Object.assign(this.state, newState);
      }
    });
  }
  // to avoid having to use this.store.events.method_name()
  subscribe(action, callback) {
    this.events.subscribe(action, callback);
  }
  unsubscribe(action, callback) {
    this.events.unsubscribe(action, callback);
  }
  publish(action, payload) {
    this.events.publish(action, payload);
  }
  // ------------------------------------------------------------
}

// refactor later to take reducers by default e.g createStore(reducers)
// also think about implementing a root reducer or combineReducers.
const createStore = ({ reducers, initialState }) => {
  return new Store({ reducers, initialState });
};

module.exports = {
  createStore,
};
