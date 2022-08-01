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
    const token = this.events[event].length + 1;
    this.events[event].push({ callback, token });

    return token;
  }
  publish(event, data) {
    if (this.events[event]) {
      // call the callbacks of the subscribers
      this.events[event].forEach(({ callback }) => {
        callback(data);
      });
    }
  }
  // use token to unsubscribe
  unsubscribe(event, evtToken) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(
        ({ token }) => token !== evtToken
      );
    }
  }
}

module.exports = { EventsManager };
