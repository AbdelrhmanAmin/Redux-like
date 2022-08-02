import { useReducer } from "react";
import { createContext, useContext, useEffect, useMemo } from "react";

const StoreContext = createContext();

const Provider = ({ children, store }) => {
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
