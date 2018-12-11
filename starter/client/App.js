import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./redux/actions/authActions";

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

// Protected Views
import Full from "./protected/Full";

// Public Views
import Login from "./views/Login";
import Logout from "./views/Logout";
import Register from "./views/Register";
import Page404 from "./views/Page404";

class App extends Component {
  render() {
    //console.log(this.props);
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
          <Route path="/data" component={Full} />
          {this.props.auth.isAuthenticated ? (
            <Route component={Full} />
          ) : (
            <Route component={Page404} />
          )}
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(App);
