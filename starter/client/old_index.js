import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";

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

// Containers
import Full from "./containers/Full/";

// Views
import Login from "./views/Home/Login/";
import Register from "./views/Home/Register/";

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/login" name="Login Page" component={Login} />
      <Route exact path="/register" name="Register Page" component={Register} />
      <Route path="/" name="Home" component={Full} />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
