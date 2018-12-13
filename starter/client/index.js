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

// Set store.auth if the user returns after leaving the page OR reloads the page
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  // If the jwt has expired, log the user out and redirect to the home page
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
