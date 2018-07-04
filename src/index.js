import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./utils/Store";

let initialState = {
  isLoggedIn: false,
  message: "",
  chatMessages: []
};

store.updateGlobalState(initialState);

ReactDOM.render(<App />, document.getElementById("root"));

