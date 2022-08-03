class EventsManager {
  constructor() {
    this.events = [];
  }
  subscribe = (listener) => {
    this.events.push(listener);
    const unsubscribe = () => {
      this.unsubscribe(listener);
    };
    return unsubscribe;
  };
  publish = () => {
    this.events.forEach((listener) => {
      listener();
    });
  };
  // use token to unsubscribe
  unsubscribe = (listener) => {
    const index = this.events.indexOf(listener);
    if (index > -1) {
      this.events.splice(index, 1);
    }
  };
}

export default EventsManager;
