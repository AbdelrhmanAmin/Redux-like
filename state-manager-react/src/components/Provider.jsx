import { useReducer } from "react";
import { createContext, useContext, useEffect, useMemo } from "react";

const StoreContext = createContext();

const Provider = ({ children, store }) => {
  const [, forceUpdate] = useReducer((state) => state + 1, 0);
  useEffect(() => {
    const token = store.subscribe("stateChange", () => {
      forceUpdate();
      console.log(store.getState());
    });
    return () => {
      store.unsubscribe(token);
    };
  }, []);
  const contextValue = {
    store,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a Provider");
  }
  return context.store;
};

export default Provider;
