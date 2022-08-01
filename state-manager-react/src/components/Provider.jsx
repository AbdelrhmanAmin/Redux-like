import { createContext, useEffect, useMemo } from "react";

const StoreContext = createContext();

const Provider = ({ children, store }) => {
  const contextValue = useMemo(() => {
    return {
      ...store,
    };
  }, [store]);
  useEffect(() => {
    const token = store.subscribe("stateChanged", () => {
      console.log("store changed");
    });
    return () => {
      store.unsubscribe(token);
    };
  }, []);
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default Provider;
