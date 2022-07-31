class EventsManager {
  constructor() {
    // { "stateChange": [function1, function2, function3...etc],...etc }
    this.events = {};
  }
  subscribe(event, callback) {
    if (!this.events[event]) {
      // an array to store the callbacks of all the subscribers
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  publish(event, data) {
    if (this.events[event]) {
      // call the callbacks of the subscribers
      this.events[event].forEach((callback) => {
        callback(data);
      });
    }
  }
  unsubscribe(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }
  }
}

export default EventsManager;
