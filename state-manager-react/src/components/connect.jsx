import { useEffect, useReducer } from "react";
import { useStore } from "./Provider";

const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  return (props) => {
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);
    const store = useStore();
    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        console.log("hi");
        forceUpdate();
      });
      return () => unsubscribe();
    }, []);
    return (
      <WrappedComponent
        {...props}
        {...mapStateToProps(store.getState())}
        {...mapDispatchToProps(store.dispatch)}
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
