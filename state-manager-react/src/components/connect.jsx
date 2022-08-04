import { useEffect, useReducer } from "react";
import findDiff from "../utils/findDiff";
import { useStore } from "./Provider";

const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  return (props) => {
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);
    const store = useStore();
    let isSubscribed = false;
    let prevSelectedSlots;
    if (mapStateToProps && typeof mapStateToProps === "function") {
      isSubscribed = true;
      prevSelectedSlots = mapStateToProps(store.getState());
    }
    useEffect(() => {
      let unsubscribe;
      if (isSubscribed) {
        unsubscribe = store.subscribe(() => {
          // Logic to detect if the selected slots have changed, if so then update the component
          const newSelectedSlots = mapStateToProps(store.getState());
          const diff = findDiff(prevSelectedSlots, newSelectedSlots);
          const hasDiff = Array.isArray(diff)
            ? diff.length > 0
            : Object.keys(diff).length > 0;
          if (hasDiff) {
            prevSelectedSlots = newSelectedSlots;
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
