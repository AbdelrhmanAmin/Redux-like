import EventsManager from "./EventsManager";

class Store {
  constructor({ reducers, initialState }) {
    this.state = initialState || {};
    this.events = new EventsManager();
    this.reducers = reducers || [];
    // A proxy to supervise the state and publish events
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

  dispatch(type, payload) {
    this.reducers.forEach((reducer) => {
      const newState = reducer(this.state, { type, payload });
      // if the reducer returns the same state, it means it didn't return a new state,
      // because reducers are pure functions, they should not mutate the state.
      if (newState !== this.state) {
        this.state = newState;
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

export default Store;
