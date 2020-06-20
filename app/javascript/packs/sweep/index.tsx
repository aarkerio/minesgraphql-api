import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import App            from "./components/App";
import configureStore from './config/configureStore';     // load redux store

import "./index.scss";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("sweeproot"));
