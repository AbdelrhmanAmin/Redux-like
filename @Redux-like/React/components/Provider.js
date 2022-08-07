import React from "react";

const StoreContext = React.createContext();

const Provider = ({ children, store }) => {
  const contextValue = { store };
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => React.useContext(StoreContext).store;

export { Provider, useStore };
