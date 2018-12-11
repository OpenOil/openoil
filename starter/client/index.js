import React from "react";
import ReactDOM from "react-dom";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import setAuthToken from "./redux/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions";

// JWT Auth Imports
import jwt_decode from "jwt-decode";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
