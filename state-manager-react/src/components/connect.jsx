import { useEffect, useReducer } from "react";
import didStateChange from "../utils/didStateChange";
import { useStore } from "./Provider";

const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  return (props) => {
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);
    const store = useStore();
    let isSubscribed = false;
    let prevState;
    if (mapStateToProps && typeof mapStateToProps === "function") {
      isSubscribed = true;
      prevState = mapStateToProps(store.getState());
    }
    useEffect(() => {
      let unsubscribe;
      if (isSubscribed) {
        unsubscribe = store.subscribe(() => {
          // Logic to detect if the selected slots have changed, if so then update the component
          const shouldUpdate = didStateChange(
            prevState,
            mapStateToProps,
            store
          );
          if (shouldUpdate) {
            prevState = mapStateToProps(store.getState());
            forceUpdate();
          }
        });
      }
      return () => {
        if (isSubscribed) {
          unsubscribe();
        }
      };
    }, []);
    return (
      <WrappedComponent
        {...props}
        {...(isSubscribed ? mapStateToProps(store.getState()) : {})}
        {...(mapDispatchToProps ? mapDispatchToProps(store.dispatch) : {})}
      />
    );
  };
};

export default connect;

/*

 state => ({
    value: state.counter,
  }),
  // Given Redux dispatch, return callback props
  dispatch => ({
    onIncrement() {
      dispatch({ type: 'INCREMENT' })
    }
  })
*/
