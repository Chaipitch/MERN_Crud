import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, compose } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const container = document.getElementById("root");
const root = createRoot(container);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore(
  { reducer: rootReducer },
  composeEnhancer(applyMiddleware(thunk))
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
