const { EventsManager } = require("./EventsManager");
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
    if (newState !== this.state) {
      this.state = Object.assign(this.state, newState);
    }
  }
  // to avoid having to use this.store.eventsManager.method_name()
  subscribe(action, callback) {
    this.eventsManager.subscribe(action, callback);
  }
  unsubscribe(action, callback) {
    this.eventsManager.unsubscribe(action, callback);
  }
  publish(action, payload) {
    this.eventsManager.publish(action, payload);
  }
  // ------------------------------------------------------------
}

// refactor later to take reducers by default e.g createStore(reducers)
// also think about implementing a root reducer or combineReducers.
const createStore = (rootReducer) => {
  const state = rootReducer({}, {});
  return new Store({ reducer: rootReducer, initialState: state });
};

/*
  reducers is an object with keys that are the names of the reducers and the name of the slot in the state.
  e.g. reducers = {
    items: itemsReducer,
  }
*/
const combineReducers = (reducers) => {
  const rootReducer = (state = {}, action) => {
    return Object.keys(reducers).reduce((newState, key) => {
      newState[key] = reducers[key](state[key], action);
      return newState;
    }, {});
  };
  return rootReducer;
};

module.exports = {
  createStore,
  combineReducers,
};
