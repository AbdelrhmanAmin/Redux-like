import compose from "./utils/compose";
/*
  this will return the new store with the composed dispatch
  {
    ...store,
    dispatch
  }
*/

const applyMiddleware =
  (...middlewares) =>
  (createStore) =>
  (reducer, initialState) => {
    const store = createStore(reducer, initialState);
    let dispatch = store.dispatch;
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    };
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);
    return {
      ...store,
      dispatch,
    };
  };

export default applyMiddleware;
