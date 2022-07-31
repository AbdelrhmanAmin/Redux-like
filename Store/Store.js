import EventsManager from "./EventsManager";

class Store {
  constructor(props) {
    this.state = {};
    this.events = new EventsManager();
    this.reducers = props.reducers || [];
    // A proxy to supervise the state and publish events
    this.state = new Proxy(props.state || this.state, {
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

  dispatch(action, payload) {
    const emitter = this.actions[action];
    if (emitter) {
      this.trigger(emitter, payload);
    } else {
      console.error(`Action ${action} not found`);
    }
  }
  trigger(action, payload) {
    const reducer = this.reducers[action];
    if (reducer) {
      const currentState = this.state;
      const newState = reducer(currentState, payload);
      this.state = newState;
    } else {
      console.error(`${action} has no reducer`);
    }
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
