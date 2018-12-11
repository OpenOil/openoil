import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Redux Imports
import { Provider } from "react-redux";
import store from "./redux/store";
import setAuthToken from "./redux/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions";

// JWT Auth Imports
import jwt_decode from "jwt-decode";

// Styles
// Import Flag Icons Set
import "flag-icon-css/css/flag-icon.min.css";
// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";
// Import Main styles for this application
import "../scss/style.scss";
// Temp fix for reactstrap
import "../scss/core/_dropdown-menu-right.scss";

//CoreUI Icons
import "@coreui/icons/scss/coreui-icons.scss";

// Containers
import Full from "./containers/Full";

// Views
//import Navbar from "./components/Navbar";
//import Register from "./components/Register";
//import Home from "./components/Login";
//import Home from "./components/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Page404 from "./views/Page404";
import Logout from "./views/Logout";

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

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
            <Route path="/dashboard" component={Full} />
            <Route component={Full} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
