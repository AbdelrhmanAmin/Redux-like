import { createContext, useContext, useMemo } from "react";

const StoreContext = createContext();

const Provider = ({ children, store }) => {
  const contextValue = useMemo(() => ({ store }), [store]);
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => useContext(StoreContext).store

export { Provider, useStore };
