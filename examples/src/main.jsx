import { Provider } from "redux-like-react";
import { applyMiddleware, createStore } from "redux-like-core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import rootReducer from "./reducers";

const middleware = (api) => (next) => (action) => {
  console.log({ action });
  return next(action);
};

const middlewares = [middleware];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
